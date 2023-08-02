<template>
  <div class="manage-project pt-12 pb-32 2xl:px-36 lg:px-32 px-12 grid justify-items-center">
    <Avatar />
    <HomeMenu />
    <div class="header syne-bold text-5xl">Update Profile</div>
    <div class="content w-full justify-between flex px-10">
      <div class="right w-full pt-10 px-64">
        <form onsubmit="return false">
          <h2 class="text-lg font-bold leading-7 text-gray-900">Profile</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
          <div class="space-y-12">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="col-span-full">
                <div class="w-full">
                  <label
                    for="street-address"
                    class="block text-lg font-bold leading-6 text-gray-900"
                    >Email</label
                  >
                  <div class="mt-2">
                    <input
                      id="disabled-input-2"
                      readonly
                      aria-label="disabled input 2"
                      class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      :value="profile?.email"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="col-span-full">
                <div class="w-full">
                  <label
                    for="street-address"
                    class="block text-lg font-bold leading-6 text-gray-900"
                    >Your Name</label
                  >
                  <div class="mt-2">
                    <input
                      v-model="profile.name"
                      type="text"
                      class="color-outline outline-none block w-3/4 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span v-if="errors.name" class="text-rose-500">*{{ errors.name[0] }}</span>
                  </div>
                </div>
              </div>
              <div class="col-span-full flex justify-between">
                <div class="w-2/3">
                  <label
                    for="street-address"
                    class="block text-lg font-bold leading-6 text-gray-900"
                    >Phone Number</label
                  >
                  <div class="mt-2">
                    <input
                      v-model="profile.phone"
                      type="number"
                      class="color-outline outline-none block w-3/4 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span v-if="errors.phone" class="text-rose-500">*{{ errors.phone[0] }}</span>
                  </div>
                </div>
              </div>
              <div class="col-span-full flex justify-between">
                <div>
                  <label for="photo" class="block text-lg font-bold leading-6 text-gray-900"
                    >Photo</label
                  >
                  <div class="mt-2 flex items-center gap-x-3">
                    <img
                      :src="profile?.avatar || avatarDefault"
                      class="inline-block h-20 w-20 rounded-full ring-2 ring-white mr-5"
                      @error="handleAvatar"
                    />
                    <button
                      type="button"
                      class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-span-full">
                <label for="cover-photo" class="block font-bold leading-6 text-gray-900 text-lg"
                  >Upload Cover Photo</label
                >
                <div
                  ref="upload"
                  class="mt-2 drop-zone w-full h-80"
                  @click="openFileInput"
                  @dragover="handleDragOver"
                  @drop="handleDrop"
                  @dragleave="handleDragLeave"
                >
                  <div v-if="!previewThumbnail" class="drop-zone__prompt">
                    Click or drag to upload
                  </div>
                  <div
                    v-else
                    class="drop-zone__thumb"
                    :style="{ backgroundImage: `url(${previewThumbnail})` }"
                    :data-label="fileName"
                  ></div>
                  <input
                    ref="fileInput"
                    class="drop-zone__input"
                    type="file"
                    @change="handleFileChange"
                  />
                </div>
                <span v-if="errors.thumbnail" class="text-rose-500"
                  >*{{ errors.thumbnail[0] }}</span
                >
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-x-6">
            <button
              class="save-button rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="handleSubmit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import HomeMenu from '@/components/Menu.vue'
import { useRoute } from 'vue-router'
import Avatar from '@/components/Avatar.vue'
import axios from 'axios'
import avatarDefault from '@/assets/images/avatar-default.jpg'
import { getDataOnCookies } from '@/utils'
export default defineComponent({
  name: 'UpdateProject',
  components: { HomeMenu, Avatar },
  setup() {
    const profile = ref({})
    const errors = ref(false)
    // const router = useRouter()
    const route = useRoute()

    onMounted(
      async () =>
        await axios
          .get(`http://127.0.0.1:8000/api/auth/v1/projects/${route.params.id}/data`, {
            headers: {
              Authorization: `Bearer ${getDataOnCookies('access_token')}`,
            },
          })
          .then((response) => {
            profile.value = response.data
          })
          .catch((e) => console.log(e))
    )

    return { errors, profile }
  },
  data() {
    return {
      previewThumbnail: '',
      fileName: '',
      thumbnailUpload: '',
      avatarDefault,
    }
  },
  methods: {
    handleAvatar(event: Event) {
      const imgElement = event.target as HTMLImageElement
      imgElement.src = avatarDefault
    },
    openFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileChange(e) {
      const file = e.target.files[0]
      if (file) {
        this.updateThumbnail(file)
      }
    },
    handleDragOver(e) {
      e.preventDefault()
      this.$refs.upload.classList.add('over-upload')
    },
    handleDragLeave(e) {
      e.preventDefault()
      this.$refs.upload.classList.remove('over-upload')
    },
    handleDrop(e) {
      e.preventDefault()
      this.$refs.upload.classList.remove('over-upload')

      const file = e.dataTransfer.files[0]
      if (file) {
        this.$refs.fileInput.files = e.dataTransfer.files
        this.updateThumbnail(file)
      }
    },
    updateThumbnail(file: File) {
      this.fileName = file.name

      if (file.type.startsWith('image/')) {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        var url = window.URL || window.webkitURL

        reader.onload = () => {
          this.previewThumbnail = reader.result
          this.thumbnailUpload = file
          this.project.thumbnail = url.createObjectURL(file)
        }
      } else {
        this.previewThumbnail = null
      }
    },
  },
})
</script>

<style lang="scss">
.manage-project {
  .color-outline:focus {
    --tw-ring-offset-color: #ff56bb;
    box-shadow: 0 0 0 0 #ff56bb, inset 0 0 0 calc(2px + 0px) #ff56bb;
  }
  .save-button {
    cursor: pointer;
    color: #ffff;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    background: linear-gradient(156deg, #ff56bb 0%, #ff8f77 100%);
  }
  .tag {
    color: #ffff;
    background: linear-gradient(156deg, #ff7ecb 0%, rgb(249, 173, 156) 100%);
  }
  .remove-button {
    background: linear-gradient(156deg, #ff56bb 0%, #ff8f77 100%);
  }
}
</style>
