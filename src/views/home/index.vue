<template>
  <div class="home pt-12 pb-32 2xl:px-36 lg:px-32 px-12">
    <HomeMenu />
    <section class="banner mb-4">
      <HomeBanner />
    </section>
    <section class="interacted mb-10">
      <HomeInteracted />
    </section>
    <section class="popular w-full mb-20">
      <HomePopular />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeInteracted from './components/HomeInteracted.vue'
import HomePopular from './components/HomePopular.vue'
import HomeMenu from '@/components/Menu.vue'

export default defineComponent({
  name: 'HomePage',
  components: { HomeBanner, HomeMenu, HomeInteracted, HomePopular },
  created() {
    localStorage.setItem('user_id', '1')
  },
})
</script>
<style lang="scss">
.home {
  display: grid;
  justify-items: center;
  .banner {
    width: 100%;
  }
  .interacted {
    width: 100%;
  }
  /* .popular {
    width: 100%;
  } */
}
</style>
