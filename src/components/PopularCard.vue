<template>
  <div class="popular-card flex justify-center rounded-xl">
    <div>
      <div class="project-image relative">
        <img
          class="project rounded-lg"
          :src="info.thumbnail"
          @error="(event:Event) => {
            const imgElement = event.target as HTMLImageElement
            imgElement.src = defaultImg}"
        />
        <div class="card-option flex w-full items-center justify-between absolute">
          <SaveButton />
          <button class="try-btn w-24 h-8 bg-white text-sm font-bold">Try it out</button>
        </div>
        <button class="follow-btn">FOLLOW</button>
      </div>

      <div class="p-2 mb-1">
        <div class="text-lg font-bold h-7">
          <router-link :to="'/project-detail/' + info.id">
            {{ info.name }}
          </router-link>
        </div>
        <div v-if="typeof info.tags === 'string'" class="text-xs font-bold h-4">
          #{{ info.tags?.split(',')?.join(' - ') }}
        </div>
        <div v-else class="text-xs font-bold h-4">#{{ info.tags?.join(' - ') }}</div>
      </div>
      <div class="px-3 flex w-full justify-between">
        <div class="avatar relative flex items-center">
          <img
            :src="info.avatar || avatarDefault"
            class="inline-block h-10 w-10 rounded-full ring-2 ring-white mr-2"
            @error="handleAvatar"
          />
          <ToolTip :content="info.name">
            <template #content>
              <span class="text-base font-semibold hover:underline cursor-pointer h-fit">
                {{ info.name?.length > 12 ? info.name?.slice(0, 12) + '...' : info.name }}
              </span>
            </template>
          </ToolTip>
        </div>
        <div class="flex justify-between w-32 mt-1">
          <div class="cursor-pointer flex items-center">
            <LikeButton :like-number="likeNumber" :project="info" @like="incrementLikeNumber" />
            <ToolTip :content="likeNumber">
              <template #content>
                <span class="text-base font-bold">{{ roundToK(likeNumber) || 0 }}</span>
              </template>
            </ToolTip>
          </div>

          <div class="cursor-pointer flex items-center">
            <ToolTip class="flex items-center" :content="info.view">
              <template #content>
                <img :src="eyes" class="w-8 mr-1" />
                <span class="text-base font-bold">{{ roundToK(info.view) || 0 }}</span>
              </template>
            </ToolTip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import avatarDefault from '@/assets/images/avatar-default.jpg'
import eyes from '@/assets/icons/Eyes.svg'
import ToolTip from '@/components/ToolTip.vue'
import LikeButton from './LikeButton.vue'
import SaveButton from './SaveButton.vue'
import defaultImg from '@/assets/images/default-img.png'
import { roundToK } from '@/utils/index'
export default defineComponent({
  name: 'PopularCard',
  components: {
    LikeButton,
    SaveButton,
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
  setup(props) {
    const likeNumber = ref(props.info.users_liked?.length)
    return {
      likeNumber,
    }
  },
  data() {
    return {
      avatarDefault,
      eyes,
      roundToK,
      defaultImg,
    }
  },
  methods: {
    handleAvatar(event: Event) {
      const imgElement = event.target as HTMLImageElement
      imgElement.src = avatarDefault
    },
    incrementLikeNumber(isLike: boolean) {
      console.log(this.likeNumber)
      if (isLike) this.likeNumber++
      else this.likeNumber--
    },
  },
})
</script>
<style lang="scss">
.popular-card {
  width: 330px;
  height: 420px;
  border-bottom: 4px solid black;

  .project-image {
    position: relative;
    width: 330px;
    height: 300px;
    border-radius: 10px;
    border: 3px solid black;
  }
  .project {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.4s ease-in-out;
  }
  .card-option {
    top: 10px;
    padding: 0px 10px;
    opacity: 0;
    transition: 0.3s ease-in;
    position: absolute;
    -webkit-transform: translate(0%, -150%);
    -ms-transform: translate(0%, -150%);
    transform: translate(0%, -150%);
  }

  .try-btn {
    width: 93px;
    height: 30px;
    border-radius: 8px;

    transition: background 1s ease-out, color 0.1s ease;
    outline: none;
    &:hover {
      background: linear-gradient(156deg, #ff56bb 0%, #ff8f77 100%);
      color: white;
    }
  }
  .follow-btn {
    color: white;
    font-size: 12px;
    line-height: 0;
    padding-top: 2px;
    font-weight: 600;
    width: 150px;
    height: 25px;
    border: 3px solid black;
    border-radius: 7px;
    background: linear-gradient(156deg, #ff56bb 0%, #ff8f77 100%);
    outline: none;
    position: absolute;
    -webkit-transform: translate(-50%, 125%);
    -ms-transform: translate(-50%, 125%);
    transform: translate(-50%, 125%);
    bottom: 0;
    right: -70px;
    opacity: 0;
    -webkit-transition: 0.3s ease-out;
    transition: 0.3s ease-out;
    cursor: pointer;
  }

  &:hover {
    .project {
      filter: brightness(0.7);
    }
    .card-option {
      opacity: 1;
      -webkit-transform: translate(0%, 0%);
      -ms-transform: translate(0%, 0%);
      transform: translate(0%, 0%);
    }
    .follow-btn {
      -webkit-transform: translate(-50%, -25%);
      -ms-transform: translate(-50%, -25%);
      transform: translate(-50%, -25%);
      opacity: 1;
    }
  }
}
</style>
