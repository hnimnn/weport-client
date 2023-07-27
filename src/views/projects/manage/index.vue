<template>
  <div class="manage-project pt-12 pb-32 2xl:px-36 lg:px-32 px-12 grid justify-items-center">
    <HomeMenu />
    <div class="header syne-bold text-5xl">My Project</div>
    <div class="content w-full justify-between flex px-10 py-10">
      <div class="w-full grid grid-cols-3 gap-10">
        <MyProjectCard
          v-for="(project, index) in projects"
          :key="index"
          :info="project"
          @delete="handleDeleteProject"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyProjectCard from '@/components/MyProjectCard.vue'
import HomeMenu from '@/components/Menu.vue'
export default defineComponent({
  name: 'ManageProject',
  components: {
    MyProjectCard,
    HomeMenu,
  },
})
</script>
<script lang="ts" setup>
import { onMounted } from 'vue'

import useProjects from '@/stores/project'
const { projects, getProjectsByUserId, deleteProject } = useProjects()
function handleDeleteProject(id: number) {
  deleteProject(id)
}
onMounted(() => {
  getProjectsByUserId({ user_id: JSON.parse(localStorage.getItem('user_id') || '') })
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
