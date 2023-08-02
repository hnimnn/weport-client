<template>
  <div class="manage-project pt-12 pb-32 2xl:px-36 lg:px-32 px-12 grid justify-items-center">
    <Avatar />
    <HomeMenu />
    <div class="header syne-bold text-5xl">Saved Project</div>
    <div class="content w-full justify-between flex px-10 py-10">
      <div class="w-full grid grid-cols-3 gap-10">
        <PopularCard v-for="(project, index) in projects" :key="index" :info="project" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PopularCard from '@/components/PopularCard.vue'
import HomeMenu from '@/components/Menu.vue'
import Avatar from '@/components/Avatar.vue'
import { onMounted } from 'vue'
import axios from 'axios'
import { getDataOnCookies } from '@/utils'
import useProjects from '@/stores/project'

export default defineComponent({
  name: 'SavedProject',
  components: {
    PopularCard,
    HomeMenu,
    Avatar,
  },
  setup() {
    const { projects } = useProjects()

    onMounted(async () => {
      if (JSON.parse(localStorage.getItem('user') || '')) {
        await axios
          .get('http://127.0.0.1:8000/api/auth/v1/projects/save/list', {
            headers: {
              Authorization: `Bearer ${getDataOnCookies('access_token')}`,
            },
          })
          .then((response) => {
            projects.value = response.data
            console.log(response)
          })
          .catch((e) => console.log(e))
      }
    })
    return { projects }
  },
})
</script>
<style lang="scss">
.manage-project {
  .preview-card {
    width: 467px;
    height: 203px;
  }
}
</style>
