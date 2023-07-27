<template>
  <div class="modal fixed right-8 z-10">
    <img
      id="avatarButton"
      type="button"
      class="w-16 h-16 stroke-cyan-500 rounded-full cursor-pointer"
      src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg"
      @click="() => (isOpen = !isOpen)"
    />
    <span
      class="bottom-[-3px] left-12 absolute w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"
    ></span>
    <!-- Dropdown menu -->
    <div
      class="modal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-12 top-16 shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]"
      :class="{ hidden: !isOpen }"
    >
      <div class="modal px-4 py-3 text-sm text-gray-900 dark:text-white">
        <div>Bonnie Green</div>
        <div class="font-medium truncate">name@flowbite.com</div>
      </div>
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
        <li>
          <router-link
            to="/manage-project"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            My Project
          </router-link>
        </li>
        <li>
          <router-link to="/create-project" class="block px-4 py-2 hover:bg-gray-100"
            >Create Project</router-link
          >
        </li>
      </ul>
      <div class="py-1">
        <router-link
          to="/signin"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >Sign out</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'AvatarComponent',
  setup() {
    const isOpen = ref(false)

    const handleClickOutside = (event) => {
      if (!event.target.parentElement.classList.contains('modal')) {
        isOpen.value = false
      }
    }

    // Attach event listener when component is mounted
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    // Remove event listener when component is unmounted
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })
    return { isOpen }
  },
})
</script>
<style lang="scss"></style>
