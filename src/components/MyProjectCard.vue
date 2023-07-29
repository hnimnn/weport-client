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
        <h3 class="font-black text-gray-800 text-lg">{{ info.name }}</h3>
        <p class="text-gray-500 text-xs">
          {{
            info.description?.length > 40 ? info.description.slice(0, 40) + '...' : info.description
          }}
        </p>
      </div>

      <div class="w-full flex justify-end">
        <div class="flex justify-between w-28 mr-2">
          <div class="cursor-pointer flex items-center">
            <LikeButton :project="info" :is-disabled="true" />
            <ToolTip :content="info.users_liked?.length">
              <template #content>
                <span class="text-base font-bold">{{ info.users_liked?.length || 0 }}</span>
              </template>
            </ToolTip>
          </div>
          {{ console.log(info) }}
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
  emits: ['delete'],

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
