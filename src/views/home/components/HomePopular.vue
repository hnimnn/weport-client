<template>
  <div class="popular-home h-full w-full">
    <p class="syne-bold mb-12 text-3xl">Projects</p>
    <div class="card-block h-full w-full grid px-16 md:px-0 justify-between justify-items-center">
      <PopularCard v-for="project in projects" :key="project.id" :info="project" />
      <!-- <PopularCard v-for="popular in populars" :key="popular.id" :info="popular" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PopularCard from '@/components/PopularCard.vue'

export default defineComponent({
  name: 'HomePopular',
  components: {
    PopularCard,
  },
})
</script>
<script lang="ts" setup>
import { onMounted } from 'vue'

import useProjects from '@/stores/project'
const { projects, getProjects } = useProjects()

onMounted(() => {
  getProjects()
})
</script>
<style lang="scss">
.card-block {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
@media (max-width: 1620px) {
  .card-block {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 1536px) {
}
@media (max-width: 1280px) {
  .card-block {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 1024px) {
}
@media (max-width: 768px) {
  .card-block {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
}
</style>
