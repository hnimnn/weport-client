<template>
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
        }
      "
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import heartDefault from '@/assets/icons/HeartDefault.svg'
import heartClicked from '@/assets/icons/HeartClicked.svg'
import LikeDisabled from '@/assets/icons/LikeDisabled.svg'
import LikeDefaultDisabled from '@/assets/icons/LikeDefaultDisabled.svg'
import { useRouter } from 'vue-router'
import { getDataOnCookies } from '@/utils'
// import axios from 'axios'
import { request } from '@/utils/request'
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
  setup(props, { emit }) {
    const liked = ref(false)
    const router = useRouter()
    async function toggleLike() {
      if (localStorage.getItem('user')) {
        liked.value = !liked.value
        emit('like', liked.value)
        await request
          .post(
            `/projects/${this.project.id}/like`,
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
          })
          .catch((e) => console.log(e))
      } else {
        router.push({ name: 'Signin' })
      }
    }
    liked.value = props.project?.users_liked?.some((item) => {
      if (localStorage.getItem('user'))
        return item.id == JSON.parse(localStorage.getItem('user') || '').id
    })
    watch(
      () => props.project, // Watch the `project` prop
      (newProject) => {
        // Perform the logic to check if the user has liked the project
        liked.value = newProject?.users_liked?.some((item) => {
          if (localStorage.getItem('user'))
            return item.id == JSON.parse(localStorage.getItem('user') || '').id
        })
      }
    )
    return { liked, toggleLike }
  },
  data() {
    return {
      heartDefault,
      heartClicked,
      LikeDisabled,
      LikeDefaultDisabled,
    }
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
