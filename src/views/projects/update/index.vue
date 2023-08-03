<template>
  <div class="manage-project pt-12 pb-32 2xl:px-36 lg:px-32 px-12 grid justify-items-center">
    <Avatar />
    <HomeMenu />
    <div class="header syne-bold text-5xl">Update Project</div>
    <div class="content w-full justify-between flex px-10">
      <div class="right w-7/12 pt-10 pl-16">
        <form onsubmit="return false">
          <div class="space-y-12">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="col-span-full">
                <label for="cover-photo" class="block font-bold leading-6 text-gray-900 text-lg"
                  >Upload Thumbnail</label
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
                    accept="image/png, image/jpeg"
                    @change="handleFileChange"
                  />
                </div>
                <span v-if="errors.thumbnail" class="text-rose-500"
                  >*{{ errors.thumbnail[0] }}</span
                >
              </div>
            </div>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="col-span-full">
                <div class="w-full">
                  <label
                    for="street-address"
                    class="block text-lg font-bold leading-6 text-gray-900"
                    >Project Source</label
                  >
                  <div class="mt-2">
                    <input
                      v-model="project.source"
                      type="text"
                      class="color-outline outline-none block w-3/4 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span v-if="errors.source" class="text-rose-500">*{{ errors.source[0] }}</span>
                  </div>
                </div>
              </div>
              <div class="col-span-full flex justify-between">
                <div class="w-2/3">
                  <label
                    for="street-address"
                    class="block text-lg font-bold leading-6 text-gray-900"
                    >Project Name</label
                  >
                  <div class="mt-2">
                    <input
                      v-model="project.name"
                      type="text"
                      class="color-outline outline-none block w-3/4 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span v-if="errors.name" class="text-rose-500">*{{ errors.name[0] }}</span>
                  </div>
                </div>
                <div class="w-1/3">
                  <label
                    for="street-address"
                    class="block text-lg font-bold leading-6 text-gray-900"
                    >Price</label
                  >
                  <div class="mt-2">
                    <input
                      v-model="project.price"
                      step="0.01"
                      type="number"
                      class="color-outline outline-none block w-3/4 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span v-if="errors.price" class="text-rose-500">*{{ errors.price[0] }}</span>
                  </div>
                </div>
              </div>
              <div class="col-span-full">
                <label
                  for="description"
                  class="outline-none block text-lg font-bold leading-6 text-gray-900"
                  >Description</label
                >
                <div class="mt-2">
                  <textarea
                    id="description"
                    :value="project.description"
                    name="description"
                    rows="3"
                    class="color-outline outline-none px-4 py-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    @change="project.description = $event?.target?.value"
                  ></textarea>
                </div>
                <p class="mt-3 text-sm leading-6 text-gray-600">
                  Write something about your project.
                </p>
              </div>
              <div class="col-span-full">
                <label for="street-address" class="block text-lg font-bold leading-6 text-gray-900"
                  >Tags</label
                >
                <div class="relative mt-2">
                  <div class="flex">
                    <input
                      :value="tag"
                      class="color-outline outline-none block w-1/2 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter some tags"
                      @change="tag = $event?.target?.value"
                    />
                    <button
                      class="save-button rounded-md ml-8 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      @click="handleAddTag()"
                    >
                      Add
                    </button>
                  </div>

                  <div
                    v-for="(_tag, index) in project.tags"
                    :key="index"
                    class="tag inline-flex items-center text-sm rounded mt-2 mr-1 overflow-hidden"
                  >
                    <span class="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1" x-text="tag">{{
                      _tag
                    }}</span>
                    <button
                      class="remove-button w-6 h-8 inline-block align-middle text-gray-500 focus:outline-none"
                      @click="removeTag(index)"
                    >
                      <svg
                        class="w-6 h-6 fill-current mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="white"
                          d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
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
      <div class="left w-5/12 flex justify-center pt-20 pl-32"><PopularCard :info="project" /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import HomeMenu from '@/components/Menu.vue'
import PopularCard from '@/components/PopularCard.vue'
import useProjects from '@/stores/project'
import { useRouter, useRoute } from 'vue-router'
import Avatar from '@/components/Avatar.vue'
import { getDataOnCookies } from '@/utils'
import { request } from '@/utils/request'
export default defineComponent({
  name: 'UpdateProject',
  components: { HomeMenu, PopularCard, Avatar },
  setup() {
    const { project, errors, updateProject } = useProjects()
    const router = useRouter()
    const route = useRoute()

    const tag: Ref<string> = ref('')
    onMounted(
      async () =>
        await request
          .get(`/projects/${route.params.id}/data`, {
            headers: {
              Authorization: `Bearer ${getDataOnCookies('access_token')}`,
            },
          })
          .then((response) => {
            project.value = response.data
            if (!project.value.tags) {
              project.value.tags = []
            } else project.value.tags = project.value.tags?.split(',')
          })
          .catch((e) => console.log(e))
    )

    function handleAddTag() {
      console.log('project', project)

      if (tag.value !== '') {
        project.value.tags?.push(tag.value)
        tag.value = ''
      }
    }
    function removeTag(index: number) {
      project.value.tags.splice(index, 1)
    }
    function handleSubmit() {
      updateProject(
        {
          user_id: JSON.parse(localStorage.getItem('user') || '').id,
          name: project.value.name,
          description: project.value.description,
          tags: project.value.tags?.join(', '),
          price: project.value.price,
          source: project.value.source,
          status: 'wait',
          thumbnail: this.thumbnailUpload || project.value.thumbnail,
        },
        project.value.id
      ).then(() => {
        console.log(errors.value)

        if (!errors.value) {
          router.push({ name: 'ManageProject' })
        }
      })
    }
    return { tag, project, errors, handleAddTag, removeTag, handleSubmit }
  },
  data() {
    return {
      previewThumbnail: '',
      fileName: '',
      thumbnailUpload: '',
    }
  },
  methods: {
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
