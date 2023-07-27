<template>
  <div class="menu-home">
    <router-link to="/">
      <img class="logo" :src="logo" />
    </router-link>
    <div class="navs mt-1">
      <div v-for="nav in navs" :key="nav.name" class="nav">
        <router-link :to="{ name: nav.to }">
          {{ nav.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

import logo from '@/assets/images/logo-menu.png'
export default defineComponent({
  name: 'MenuHome',
  components: { RouterLink },
  data() {
    return {
      logo,
      navs: [
        { name: 'Community', to: '' },
        { name: 'Recruit', to: '' },
        { name: 'Market', to: '' },
        { name: 'Blog', to: '' },
        { name: 'Info', to: '' },
      ],
    }
  },
})
</script>
<style lang="scss">
.menu-home {
  position: fixed;
  width: 500px;
  height: 56px;
  padding: 0 30px;
  flex-shrink: 0;
  border-radius: 10px;
  background: linear-gradient(
    132deg,
    rgba(141, 141, 141, 0.181) 0%,
    rgba(138, 138, 138, 0.201) 100%
  );
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
  bottom: 3rem;

  .logo {
    cursor: pointer;
  }
  .navs {
    display: flex;
    align-items: center;
    gap: 18px;
    .nav {
      color: rgba(0, 0, 0, 0.5);
      font-size: 18px;
      font-weight: 400;
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: #000;
      }
    }
  }
}
</style>
