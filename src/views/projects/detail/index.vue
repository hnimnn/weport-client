<template>
  <div class="detail-project h-max p-12 grid justify-items-center">
    <InvoiceModal
      :is-open-invoice="isOpenInvoice"
      :info="project"
      @buy="handleBuy"
      @close="() => (isOpenInvoice = false)"
    />
    <Avatar />
    <HomeMenu />
    <div class="header syne-bold text-5xl">Project</div>
    <div class="py-12 sm:py-16">
      <div class="container mx-auto px-4">
        <div
          class="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16"
        >
          <div class="lg:col-span-3 lg:row-end-1">
            <div class="lg:flex lg:items-start">
              <div class="lg:order-2 lg:ml-5">
                <div class="max-w-xl overflow-hidden rounded-lg">
                  <img class="h-full w-full max-w-full object-cover" :src="activeImg" alt="" />
                </div>
              </div>

              <div class="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div class="flex flex-row items-start lg:flex-col">
                  <button
                    v-for="img in imgDetail"
                    :key="img.id"
                    type="button"
                    :class="{ 'border-4': img.url === activeImg }"
                    class="flex-0 aspect-square mb-3 h-20 overflow-hidden border-[#ff8f77] rounded-lg text-center"
                    @click="handleActiveImage(img.url)"
                  >
                    <img class="h-full w-full object-cover" :src="img.url" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="relative lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 class="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{{ project.name }}</h1>
            <div class="absolute top-0 right-8 flex items-center justify-center w-9 h-12">
              <svg
                v-if="!isSaved"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                :style="{
                  strokeWidth: '2px',
                  cursor: 'pointer',
                  fill: 'linear-gradient(156deg, #ff56bb 0%, #ff8f77 100%)',
                }"
                stroke="currentColor"
                className="h-8 w-8"
                @click="handleSave"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                :style="{ cursor: 'pointer' }"
                className="h-20 w-20"
                @click="handleSave"
              >
                <defs>
                  <linearGradient id="myGradient" gradientTransform="rotate(156)">
                    <stop offset="0%" stop-color="#ff56bb" />
                    <stop offset="100%" stop-color="#ff8f77" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#myGradient)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </div>

            <div class="mt-5 flex items-center">
              <div class="flex items-center mr-5">
                <div class="mr-1.5">
                  <LikeButton
                    :like-number="likeNumber"
                    :project="project"
                    @like="incrementLikeNumber"
                  />
                </div>
                <p class="text-xl font-bold">{{ roundToK(likeNumber) || 0 }}</p>
              </div>
              <div class="flex items-center justify-between">
                <img alt="" class="w-8 h-6 mr-2" :src="eyes" />
                <p class="text-xl font-bold">{{ project.view }}</p>
              </div>
            </div>

            <h2 class="mt-8 text-lg font-semibold text-gray-900">Tags</h2>
            <div class="mt-3 flex select-none flex-wrap items-center gap-1">
              <label
                v-for="tag in project.tags?.split(',')"
                :key="tag"
                class="rounded-2xl border border-gray-300 w-32 px-4 py-2 flex items-center cursor-pointer"
              >
                <svg
                  class="w-4 h-4 text-gray-500 mr-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <div class="w-full flex justify-center">
                  <p class="font-bold text-gray-400">{{ tag }}</p>
                </div>
              </label>
            </div>

            <div
              class="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0"
            >
              <div class="flex items-end">
                <h1 class="text-3xl font-bold">${{ project.price }}</h1>
              </div>
              <div v-if="!project.user_bought">
                <button
                  v-if="project.user_id !== currentUser.id"
                  :key="forceKey"
                  type="button"
                  class="buy-button inline-flex items-center justify-center"
                  @click="handleClickBuy"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="shrink-0 mr-3 h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Buy Now
                </button>
                <button
                  v-else
                  type="button"
                  class="buy-disabled inline-flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="shrink-0 mr-3 h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Buy Now
                </button>
              </div>
              <button
                v-else
                type="button"
                class="sold-button inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow"
              >
                Sold out!
              </button>
            </div>

            <ul class="mt-8 space-y-2">
              <li class="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  class="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    class=""
                  ></path>
                </svg>
                Pay by Visa
              </li>
            </ul>
          </div>

          <div class="lg:col-span-3">
            <div class="border-b border-gray-300">
              <div class="flex gap-4">
                <a
                  href="#"
                  class="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                >
                  Description
                </a>

                <a
                  href="#"
                  class="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600"
                >
                  Comments
                  <span
                    class="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100"
                  >
                    1,209
                  </span>
                </a>
              </div>
            </div>

            <div class="mt-8 min-w-[100vw] sm:mt-12">
              <!-- <h1 class="text-3xl font-bold">Delivered To Your Door</h1> -->
              <div class="w-[850px]">
                <p class="mt-4">
                  {{ project.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vue-basic-alert ref="alert" :duration="300" :close-in="5000" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import HomeMenu from '@/components/Menu.vue'
import useProjects from '@/stores/project'
import Avatar from '@/components/Avatar.vue'
import { useRoute, useRouter } from 'vue-router'
import LikeButton from '@/components/LikeButton.vue'
import InvoiceModal from '@/components/InvoiceModal.vue'
import eyes from '@/assets/icons/Eyes.svg'
import axios from 'axios'
import { getDataOnCookies, roundToK } from '@/utils'
import VueBasicAlert from 'vue-basic-alert'

export default defineComponent({
  name: 'ProjectDetail',
  components: { HomeMenu, Avatar, LikeButton, InvoiceModal, VueBasicAlert },
  setup() {
    const { project, getProject } = useProjects()
    const route = useRoute()
    const isSaved = ref(false)
    const isOpenInvoice = ref(false)
    const router = useRouter()
    const likeNumber = ref(0)
    const imgDetail = [
      {
        id: 1,
        url: 'https://i.pinimg.com/originals/31/f3/70/31f370a84436342d1ab8f83427ae6819.jpg',
      },
      {
        id: 2,
        url: 'https://i.pinimg.com/originals/c2/18/0f/c2180f7a5996827b4d34de1b161c19ed.jpg',
      },
      {
        id: 3,
        url: 'https://i.pinimg.com/originals/c6/a8/6f/c6a86f979b1288723f054f0b9ec28aed.jpg',
      },
    ]
    const activeImg = ref(imgDetail[0].url)

    onMounted(async () => {
      getProject(route.params.id).then(() => {
        likeNumber.value = project.value.users_liked?.length
      })
      await axios
        .post(`http://127.0.0.1:8000/api/auth/v1/projects/${route.params.id}/view`)
        .then((response) => {
          console.log(response)
        })
        .catch((e) => console.log(e))
    })
    function handleActiveImage(url: string) {
      activeImg.value = url
    }
    function handleSave() {
      isSaved.value = !isSaved.value
    }
    function handleClickBuy() {
      if (localStorage.getItem('user')) {
        isOpenInvoice.value = !isOpenInvoice.value
      } else router.push({ name: 'Signin' })
    }

    return {
      isSaved,
      project,
      imgDetail,
      activeImg,
      likeNumber,
      isOpenInvoice,
      handleActiveImage,
      handleSave,
      handleClickBuy,
    }
  },
  data() {
    return {
      eyes,
      roundToK,
      forceKey: 0,
      currentUser: JSON.parse(localStorage.getItem('user') || ''),
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    incrementLikeNumber(isLike: boolean) {
      if (isLike) this.likeNumber++
      else this.likeNumber--
    },

    async handleBuy() {
      if (getDataOnCookies('access_token')) {
        await axios
          .post(
            `http://127.0.0.1:8000/api/auth/v1/projects/${this.project.id}/buy`,
            {},
            {
              headers: {
                'Content-Type': 'multipart/form-data',

                Authorization: `Bearer ${getDataOnCookies('access_token')}`,
              },
            }
          )
          .then((response) => {
            console.log(response)
            this.$refs.alert.showAlert('success', 'Complete the project purchase', 'Success')
            this.isOpenInvoice = false
            this.project.user_bought = JSON.parse(localStorage.getItem('user') || '').id
            this.forceKey += 1

            let existingUser = localStorage.getItem('user')

            existingUser = existingUser ? JSON.parse(existingUser) : {}

            if (existingUser) existingUser['cash'] = existingUser.cash - this.project.price

            localStorage.setItem('user', JSON.stringify(existingUser))
          })
          .catch((e) => {
            this.$refs.alert.showAlert('error', e.response.data, 'Error')

            console.log(e)
          })
      }
    },
  },
})
</script>

<style lang="scss">
.detail-project {
  .buy-button {
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
    color: #ffff;
    display: flex;
    width: 180px;
    height: 55px;
    padding: 19.007px;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    flex-shrink: 0;
    border-radius: 12px;
    background: linear-gradient(156deg, #ff56bb 0%, #ff8f77 100%);
  }
  .sold-button {
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
    color: #ffff;
    display: flex;
    width: 180px;
    height: 55px;
    padding: 19.007px;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    flex-shrink: 0;
    border-radius: 12px;
    background: linear-gradient(156deg, #ff56bb9b 0%, #ff907751 100%);
  }
  .buy-disabled {
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
    color: #ffff;
    display: flex;
    width: 180px;
    height: 55px;
    padding: 19.007px;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    flex-shrink: 0;
    border-radius: 12px;
    background: linear-gradient(156deg, #515151 0%, #909090 100%);
  }
}
</style>
