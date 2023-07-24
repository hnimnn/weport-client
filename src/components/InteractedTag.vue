<template>
  <div
    class="interacted-tag w-full h-full flex items-center pl-5 pr-4 bg-white rounded-xl justify-between"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="flex items-center">
      <div class="avatar relative">
        <img
          class="inline-block h-16 w-16 rounded-full ring-2 ring-white"
          :src="info.avatar"
          @error="handleAvatar"
        />
        <span class="bagde absolute flex h-6 w-6">
          <span
            :class="{ 'animate-ping': isHovered }"
            class="animate-node absolute inline-flex h-full w-full rounded-full opacity-75"
          ></span>
          <span
            class="node relative inline-flex rounded-full h-full w-full flex items-center justify-center text-white text-xs"
            >3</span
          >
        </span>
      </div>
      <div class="info ml-5">
        <div class="name">
          <span v-if="widthTag > 343" class="text-xl syne-semi-bold cursor-pointer hover:underline">
            {{ info.name }}
          </span>
          <ToolTip v-else :content="info.name">
            <template #content>
              <span class="text-xl syne-semi-bold cursor-pointer hover:underline">
                {{ info.name.length > 7 ? info.name.slice(0, 6) + '...' : info.name }}
              </span>
            </template>
          </ToolTip>
        </div>
        <ToolTip :content="info.tags.join(' - ')">
          <template #content>
            <div class="tags cursor-pointer font-bold text-xs">
              #{{
                widthTag <= 410
                  ? info.tags.join(' - ').length > 9
                    ? info.tags.join(' - ').slice(0, 8) + '...'
                    : info.tags.join(' - ')
                  : info.tags.join(' - ')
              }}
            </div>
          </template>
        </ToolTip>
        <ToolTip :content="info.project">
          <template #content>
            <div class="project cursor-pointer text-sm font-bold">
              #{{
                widthTag <= 410
                  ? info.project.length > 7
                    ? info.project.slice(0, 6) + '...'
                    : info.project
                  : info.project
              }}
            </div>
          </template>
        </ToolTip>

        <div class="timer text-xs flex items-center">
          <img :src="clock" class="w-4" />
          <p class="time">6hrs</p>
        </div>
      </div>
    </div>
    <div class="h-full grid justify-between pt-3">
      <img :src="fire" class="w-9 justify-self-end" />
      <div class="flex justify-between w-36 mr-2">
        <div class="cursor-pointer flex items-center">
          <LikeButton />
          <ToolTip :content="info.like">
            <template #content>
              <span class="text-base font-bold">{{ roundToK(info.like) }}</span>
            </template>
          </ToolTip>
        </div>

        <div class="cursor-pointer flex items-center">
          <ToolTip class="flex items-center" :content="info.view">
            <template #content>
              <img :src="eyes" class="w-8 mr-1" />
              <span class="text-base font-bold">{{ roundToK(info.view) }}</span>
            </template>
          </ToolTip>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import avatarDefault from '@/assets/images/avatar-default.jpg'
import clock from '@/assets/icons/Clock.svg'
import eyes from '@/assets/icons/Eyes.svg'
import LikeButton from './LikeButton.vue'
import fire from '@/assets/images/fire.gif'
import { roundToK } from '@/utils/index'
import ToolTip from '@/components/ToolTip.vue'

export default defineComponent({
  name: 'InteractedTag',
  components: {
    LikeButton,
    ToolTip,
  },
  props: {
    info: {
      type: Object,
      default() {
        return {
          id: 0,
          name: 'Empty',
          avatar: avatarDefault,
          project: 'Empty',
          tags: [''],
          like: 0,
          view: 0,
        }
      },
    },
  },
  data() {
    return {
      isHovered: false,
      avatarDefault,
      clock,
      fire,
      eyes,
      widthTag: 0,
      roundToK,
    }
  },
  mounted() {
    this.widthTag = this.$el.offsetWidth
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      const width = this.$el.offsetWidth
      this.myFunction(width)
    },
    myFunction(width: number) {
      this.widthTag = width
    },
    handleAvatar(event: Event) {
      const imgElement = event.target as HTMLImageElement
      imgElement.src = avatarDefault
    },
  },
})
</script>
<style lang="scss">
.interacted-tag {
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
  .avatar {
    img {
      min-width: 64px;
      min-height: 64px;
      max-width: 64px;
      max-height: 64px;
    }
  }
  .bagde {
    top: 45px;
    left: 40px;
    border: white 3px solid;
    border-radius: 30px;
    .node {
      background: linear-gradient(156deg, #ff56bb 0%, #ff8f77 100%), #06f;
    }
    .animate-node {
      background: linear-gradient(156deg, #ff56bb 0%, #ff8f77 100%), #06f;
    }
  }
  .time {
    color: #898989;
    margin-top: 1px;
    margin-left: 2px;
  }
}
@media (max-width: 416px) {
  .interacted-tag {
    .timer {
      display: none;
    }
  }
}
</style>
