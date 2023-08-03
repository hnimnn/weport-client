<template>
  <div class="profile w-full h-full grid justify-items-center">
    <HomeMenu />
    <div class="w-full h-full">
      <div class="absolute mt-12">
        <Avatar />
      </div>
      <!-- component -->
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />

      <main class="profile-page">
        <section class="relative block h-500-px">
          <div
            class="absolute top-0 w-full h-full bg-center bg-cover"
            style="
              background-image: url('https://res.cloudinary.com/dyd8bu6vc/image/upload/v1690968391/unsplash_PGdW_bHDbpI_a2hd4p.png');
            "
          >
            <span id="blackOverlay" class="w-full h-full absolute opacity-20 bg-black"></span>
          </div>
          <div
            class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style="transform: translateZ(0px)"
          >
            <svg
              class="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                class="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section class="relative py-16 bg-blueGray-200">
          <div class="mx-auto px-36">
            <div
              class="relative min-h-[800px] flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 border-[6px] border-black"
            >
              <div class="px-6">
                <div class="relative">
                  <img
                    alt="..."
                    :src="profile.avatar || defaultAvatar"
                    class="shadow-xl rounded-full align-middle border-[6px] border-black left-1/2 top-[-15px] absolute -m-16 -ml-20 lg:-ml-16 min-w-[150px] min-h-[150px] max-w-150-px max-h-[150px] object-cover"
                    @error="handleAvatar"
                  />
                </div>
                <div class="flex flex-wrap justify-center mt-20">
                  <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div class="text-center ml-[90px]">
                      <h3 class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        {{ profile.name }}
                      </h3>
                      <div
                        class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold flex items-center justify-center"
                      >
                        <i class="fa fa-envelope mr-2 text-lg text-blueGray-400"></i>
                        <p>{{ profile?.email }}</p>
                      </div>
                      <div
                        class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold flex items-center justify-center"
                      >
                        <i class="fa fa-phone mr-2 text-lg text-blueGray-400"></i>
                        <p>{{ profile?.phone }}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="h-full mt-[-65px] ml-16 lg:w-4/12 lg:order-3 lg:text-center lg:self-center"
                  >
                    <div class="px-3 h-full mr-20">
                      <button
                        v-if="isCurrent"
                        class="follow-btn uppercase ease-linear transition-all duration-150"
                        type="button"
                        @click="() => router.push({ name: 'UpdateProfile' })"
                      >
                        Edit Profile
                      </button>
                      <button
                        v-else
                        class="follow-btn uppercase ease-linear transition-all duration-150"
                        type="button"
                      >
                        Follow
                      </button>
                    </div>
                  </div>
                  <div class="w-full lg:w-4/12 px-4 lg:order-1">
                    <div class="flex justify-end">
                      <div class="mr-4 p-3 text-center">
                        <span
                          class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                          >22</span
                        ><span class="text-sm text-blueGray-400">Follow</span>
                      </div>
                      <div class="mr-4 p-3 text-center">
                        <span
                          class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                          >10</span
                        ><span class="text-sm text-blueGray-400">Like</span>
                      </div>
                      <div class="lg:mr-4 p-3 text-center">
                        <span
                          class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                          >89</span
                        ><span class="text-sm text-blueGray-400">View</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-full flex justify-center">
                  <ul
                    class="w-2/3 flex flex-wrap justify-center text-sm font-medium text-center text-gray-500 border-b border-gray-200"
                  >
                    <li class="mr-2">
                      <button
                        class="inline-block p-2 focus:outline-none text-lg rounded-t-lg outline-none hover:text-gray-600 hover:bg-gray-200"
                      >
                        Available
                      </button>
                    </li>
                    <li class="mr-2">
                      <button
                        class="inline-block p-2 focus:outline-none text-lg rounded-t-lg outline-none hover:text-gray-600 hover:bg-gray-200"
                      >
                        Sold out
                      </button>
                    </li>
                  </ul>
                </div>

                <div class="mt-10 pt-0 pb-20 text-center">
                  <div class="flex flex-wrap justify-center">
                    <div class="grid grid-cols-3 gap-8">
                      <PopularCard v-for="project in projects" :key="project.id" :info="project" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="relative bg-blueGray-200 pt-8 pb-6 mt-8">
            <div class="container mx-auto px-4">
              <div class="flex flex-wrap items-center md:justify-between justify-center">
                <div class="w-full md:w-6/12 px-4 mx-auto text-center"></div>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Avatar from '@/components/Avatar.vue'
import HomeMenu from '@/components/Menu.vue'
import PopularCard from '@/components/PopularCard.vue'
import defaultAvatar from '@/assets/images/avatar-default.jpg'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { computed } from 'vue'
export default defineComponent({
  name: 'ProfilePage',
  components: {
    HomeMenu,
    Avatar,
    PopularCard,
  },
  setup() {
    const profile = ref({})
    const projects = ref({})
    const route = useRoute()
    const router = useRouter()

    onMounted(async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/auth/v1/user/${route.params.id}/profile`)
        .then((response) => {
          profile.value = response.data.currentUser
          projects.value = response.data.projects
        })
        .catch((e) => console.log(e))
    })
    function handleAvatar(event: Event) {
      const imgElement = event.target as HTMLImageElement
      imgElement.src = defaultAvatar
    }
    const isCurrent = computed(() => {
      if (localStorage.getItem('user'))
        return profile.value.id == JSON.parse(localStorage.getItem('user') || '').id
      else return false
    })

    return { profile, projects, handleAvatar, isCurrent, router }
  },
  data() {
    return {
      defaultAvatar,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
})
</script>
<style lang="scss">
.profile {
  .follow-btn {
    color: white;
    font-size: 12px;
    line-height: 0;
    padding-top: 2px;
    font-weight: 600;
    width: 100px;
    height: 35px;
    border: 3px solid black;
    border-radius: 7px;
    background: linear-gradient(156deg, #ff56bb 0%, #ff8f77 100%);
    outline: none;
    cursor: pointer;
  }
}
</style>
