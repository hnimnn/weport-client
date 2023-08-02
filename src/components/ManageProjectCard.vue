<template>
  <div
    class="w-full h-full relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl items-center shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white"
  >
    <router-link :to="'/update-project/' + info.id">
      <div class="w-32 h-32 bg-white">
        <img
          :src="info.thumbnail || defaultImg"
          alt="project"
          class="rounded-xl object-cover w-full h-full"
          @error="(event:Event) => {
            const imgElement = event.target as HTMLImageElement
            imgElement.src = defaultImg}"
        />
      </div>
    </router-link>
    <div class="w-full h-full flex justify-between md:w-2/3 bg-white flex-col space-y-2 p-3">
      <div class="min-h-[25px] max-h-[25px] flex items-center">
        <span
          v-if="info.status === 'published'"
          class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
          >Published</span
        >
        <span
          v-else-if="info.status === 'rejected'"
          class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
          >Rejected</span
        >
        <div v-else class="flex items-center justify-between w-full pr-8">
          <span
            class="h-full bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300"
            >Waiting</span
          >
          <div>
            <button
              type="button"
              class="h-full focus:outline-none text-white bg-lime-600 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-1 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              @click="$emit('approve', info.id, 'published')"
            >
              <svg
                class="h-4 w-4 text-white"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M5 12l5 5l10 -10" />
              </svg>
            </button>
            <button
              type="button"
              class="h-full ml-4 focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-1 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              @click="$emit('approve', info.id, 'rejected')"
            >
              <svg
                class="fill-current h-4 w-4 text-red-500"
                role="button"
                :style="{
                  fill: '#fff',
                }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 absolute top-2 right-2 cursor-pointer hover:bg-stone-200 rounded-md ease-in duration-100"
        @click="$emit('delete', info.id)"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>
        <div class="flex justify-between item-center">
          <p
            v-if="typeof info.tags === 'string'"
            class="text-gray-500 font-semibold text-sm hidden md:block"
          >
            #{{ info.tags?.split(',')?.join(' - ') }}
          </p>
          <p v-else class="text-gray-500 font-semibold text-sm hidden md:block">
            #{{ info.tags?.join(' - ') }}
          </p>
        </div>
        <h3 class="font-black text-gray-800 text-lg">{{ info?.name }}</h3>
        <p class="text-gray-500 text-xs">
          {{
            info.description?.length > 40 ? info.description.slice(0, 40) + '...' : info.description
          }}
        </p>
      </div>

      <div class="w-full flex justify-between">
        <h3 class="font-semibold text-lg text-slate-500">{{ info.user?.name }}</h3>

        <div class="flex justify-between w-28 mr-2">
          <div class="cursor-pointer flex items-center">
            <LikeButton :project="info" :is-disabled="true" />
            <ToolTip :content="info.users_liked?.length">
              <template #content>
                <span class="text-base font-bold">{{ info.users_liked?.length || 0 }}</span>
              </template>
            </ToolTip>
          </div>
          <div class="cursor-pointer flex items-center">
            <ToolTip class="flex items-center" :content="info.view">
              <template #content>
                <img :src="eyes" class="w-8 mr-1" />
                <span class="text-base font-bold">{{ info.view }}</span>
              </template>
            </ToolTip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import eyes from '@/assets/icons/Eyes.svg'
import LikeButton from '@/components/LikeButton.vue'
import ToolTip from '@/components/ToolTip.vue'
import defaultImg from '@/assets/images/default-img.png'
export default defineComponent({
  name: 'ManageProject',
  components: {
    LikeButton,
    ToolTip,
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  emits: ['delete', 'approve'],

  data() {
    return {
      eyes,
      isOpenEdit: false,
      defaultImg,
    }
  },
})
</script>
<style lang="scss"></style>
