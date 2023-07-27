<template>
  {{ console.log(isDisabled) }}
  <div v-if="isDisabled" class="like-button">
    <img
      :class="{ clicked: liked }"
      :src="liked ? LikeDefaultDisabled : LikeDisabled"
      class="heart-icon w-7 mr-1"
    />
  </div>
  <div v-else>
    <img
      :class="{ clicked: liked }"
      :src="liked ? heartClicked : heartDefault"
      class="heart-icon w-7 mr-1"
      @click="
        () => {
          toggleLike()
          $emit('like', liked)
        }
      "
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import heartDefault from '@/assets/icons/HeartDefault.svg'
import heartClicked from '@/assets/icons/HeartClicked.svg'
import LikeDisabled from '@/assets/icons/LikeDisabled.svg'
import LikeDefaultDisabled from '@/assets/icons/LikeDefaultDisabled.svg'

import axios from 'axios'
export default defineComponent({
  name: 'LikeButton',
  props: {
    isDisabled: {
      type: Boolean,
      default() {
        return false
      },
    },
    project: {
      type: Object,
      default() {
        return {}
      },
    },
    likeNumber: {
      type: Number,
      default() {
        return 0
      },
    },
  },
  emits: ['like'],
  setup(props) {
    const liked = ref(false)

    liked.value = props.project.users_liked?.some((item) => {
      return item.id == JSON.parse(localStorage.getItem('user_id') || '')
    })
    return { liked }
  },
  data() {
    return {
      heartDefault,
      heartClicked,
      LikeDisabled,
      LikeDefaultDisabled,
    }
  },
  methods: {
    async toggleLike() {
      this.liked = !this.liked
      await axios
        .post(
          `http://127.0.0.1:8000/api/v1/projects/${this.project.id}/like`,
          { user_id: 1 },
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        .then((response) => {
          console.log(response)
        })
    },
  },
})
</script>
<style lang="scss">
.heart-icon {
  transition: transform 0.5s;
}
.heart-icon:hover {
  transform: scale(1.2);
}
.heart-icon.clicked {
  animation: shake 0.75s linear 1;
}

@keyframes shake {
  10% {
    transform: translateX(3px) rotate(2deg);
  }

  20% {
    transform: translateX(-3px) rotate(-2deg);
  }

  30% {
    transform: translateX(3px) rotate(2deg);
  }

  40% {
    transform: translateX(-3px) rotate(-2deg);
  }

  50% {
    transform: translateX(2px) rotate(1deg);
  }

  60% {
    transform: translateX(-2px) rotate(-1deg);
  }

  70% {
    transform: translateX(2px) rotate(1deg);
  }

  80% {
    transform: translateX(-2px) rotate(-1deg);
  }

  90% {
    transform: translateX(1px) rotate(0);
  }

  100% {
    transform: translateX(-1px) rotate(0);
  }
}
</style>
