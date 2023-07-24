<template>
  <div class="like-button">
    <img
      :class="{ clicked: liked }"
      :src="liked ? heartClicked : heartDefault"
      class="heart-icon w-7 mr-1"
      @click="toggleLike"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import heartDefault from '@/assets/icons/HeartDefault.svg'
import heartClicked from '@/assets/icons/HeartClicked.svg'
export default defineComponent({
  name: 'LikeButton',
  data() {
    return {
      heartDefault,
      heartClicked,
      liked: false,
    }
  },
  methods: {
    toggleLike() {
      this.liked = !this.liked
    },
  },
})
</script>
<style lang="scss">
.heart-icon {
  /* Các thuộc tính CSS khác cho hình ảnh */
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
