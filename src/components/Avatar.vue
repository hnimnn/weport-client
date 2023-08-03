<template>
  <div
    class="fixed w-[72px] h-[72px] rounded-full cursor-pointer hover:bg-red-700 bg-gradient-to-r from-pink-500 via-red-300 to-orange-400 right-8 z-10 items-center grid"
  >
    <div class="modal-avatar relative flex justify-center">
      <div
        v-if="!isLogin"
        class="w-16 h-16 bg-neutral-300 rounded-full"
        @click="() => (isOpenLogin = !isOpenLogin)"
      ></div>
      <div v-else class="modal-avatar">
        <img
          id="avatarButton"
          type="button"
          class="w-16 h-16 stroke-cyan-500 rounded-full cursor-pointer object-cover"
          :src="user?.avatar || defaultAvatar"
          @error="handleAvatar"
          @click="() => (isOpen = !isOpen)"
        />
        <span
          class="bottom-[-3px] left-12 absolute w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"
        ></span>
      </div>
    </div>

    <!-- Dropdown menu -->
    <div
      :class="{ hidden: !isOpenLogin || isLogin }"
      class="absolute flex flex-col py-4 px-6 bg-white hover:shodow-lg rounded-2xl right-16 top-20 w-64 h-32 shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]"
    >
      <div class="items-center justify-between">
        <button class="absolute right-2.5 top-2.5" @click="() => (isOpenLogin = false)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div class="flex items-center mb-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 rounded-md p-1 border border-[#ff56bb] text-[#ff56bb] bg-gradient-to-r from-pink-100 via-red-100 to-orange-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div class="flex flex-col ml-3">
            <div class="font-medium leading-none">Want to sign in?</div>
            <p class="text-sm text-gray-600 leading-none mt-1">You have not signed in</p>
          </div>
        </div>
        <router-link
          to="/signin"
          class="flex items-center justify-center float-right w-24 h-9 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 text-white rounded-full"
        >
          Sign In
        </router-link>
      </div>
    </div>
    <div
      class="modal-avatar bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-[58px] top-[70px] shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]"
      :class="{ hidden: !isOpen }"
    >
      <div class="modal-avatar w-full px-4 py-3 text-sm text-gray-900 dark:text-white">
        <div class="font-bold flex justify-center w-full">{{ user?.name }}</div>
        <div class="font-medium truncate flex justify-center">{{ user?.email }}</div>
        <div class="flex justify-center">{{ user?.cash?.toFixed(2) || 0 }}</div>
      </div>
      <ul
        v-if="user?.role === 2"
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="avatarButton"
      >
        <li class="w-full">
          <router-link
            :to="'/profile/' + user.id"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
          >
            Profile
          </router-link>
        </li>
        <li class="w-full">
          <router-link
            to="/manage-project"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
          >
            My Project
          </router-link>
        </li>
        <li>
          <router-link to="/create-project" class="block px-4 py-2 hover:bg-gray-100 w-full"
            >Create Project</router-link
          >
        </li>
        <li>
          <router-link to="/saved-project" class="block px-4 py-2 hover:bg-gray-100 w-full"
            >Saved</router-link
          >
        </li>
      </ul>
      <ul
        v-else
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="avatarButton"
      >
        <li class="w-full">
          <router-link
            to="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
          >
            Profile
          </router-link>
        </li>
        <li class="w-full">
          <router-link
            to="/admin/manage-project"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
          >
            Manage Project
          </router-link>
        </li>
      </ul>
      <div class="my-1">
        <button
          class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import defaultAvatar from '@/assets/images/avatar-default.jpg'
import axios from 'axios'
import { getDataOnCookies } from '@/utils'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AvatarComponent',
  setup() {
    const isOpen = ref(false)
    const isOpenLogin = ref(true)
    const isLogin = ref(false)

    let user = null
    const router = useRouter()

    if (localStorage.getItem('user')) {
      user = JSON.parse(localStorage.getItem('user') || '')
    }
    if (!getDataOnCookies('refresh_token')) {
      localStorage.removeItem('user')
      localStorage.removeItem('token_expires')
    }
    if (localStorage.getItem('user')) {
      isLogin.value = true
    }
    const handleClickOutside = (event) => {
      if (!event.target.parentElement?.classList.contains('modal-avatar')) {
        isOpen.value = false
      }
    }
    function handleAvatar(event: Event) {
      const imgElement = event.target as HTMLImageElement
      imgElement.src = defaultAvatar
    }
    async function handleLogout() {
      await axios
        .post(
          `http://127.0.0.1:8000/api/auth/v1/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${getDataOnCookies('access_token')}`,
            },
          }
        )
        .then((response) => {
          console.log(response)

          document.cookie = 'access_token='
          document.cookie = 'refresh_token='

          localStorage.removeItem('user')
          localStorage.removeItem('token_expires')

          router.push({ name: 'Signin' })
        })
        .catch((e) => console.log(e))
    }
    // Attach event listener when component is mounted
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    // Remove event listener when component is unmounted
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })
    return {
      isLogin,
      isOpen,
      isOpenLogin,
      user,
      handleAvatar,
      getDataOnCookies,
      handleLogout,
      defaultAvatar,
    }
  },
})
</script>
<style lang="scss"></style>
