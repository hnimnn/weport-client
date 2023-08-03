<template>
  <div class="manage-project pt-12 pb-32 2xl:px-36 lg:px-32 px-12 grid justify-items-center">
    <Avatar />
    <HomeMenu />
    <div class="header syne-bold text-5xl">All Project</div>
    <div class="content w-full justify-between flex px-10 py-10">
      <div class="w-2/3 flex grid grid-cols-2 gap-10">
        <ManageProjectCard
          v-for="(project, index) in projects"
          :key="index"
          :info="project"
          @delete="handleDeleteProject"
          @approve="hanldeApprove"
        />
      </div>
      <div class="w-1/3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ManageProjectCard from '@/components/ManageProjectCard.vue'
import HomeMenu from '@/components/Menu.vue'
import Avatar from '@/components/Avatar.vue'
import { request } from '@/utils/request'
export default defineComponent({
  name: 'ManageProject',
  components: {
    ManageProjectCard,
    HomeMenu,
    Avatar,
  },
})
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getDataOnCookies } from '@/utils'
import useProjects from '@/stores/project'
const { deleteProject } = useProjects()
const projects = ref({})
function handleDeleteProject(id: number) {
  deleteProject(id)
}
onMounted(async () => {
  if (JSON.parse(localStorage.getItem('user'))) {
    await request
      .get('/admin/projects/all', {
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

async function hanldeApprove(id: number, status: string) {
  await request
    .post(
      `/admin/projects/${id}/approve`,
      { status: status },
      {
        headers: {
          'Content-Type': 'multipart/form-data',

          Authorization: `Bearer ${getDataOnCookies('access_token')}`,
        },
      }
    )
    .then(async (response) => {
      await request
        .get('/admin/projects/all', {
          headers: {
            Authorization: `Bearer ${getDataOnCookies('access_token')}`,
          },
        })
        .then((response) => {
          projects.value = response.data
          console.log(response)
        })
        .catch((e) => console.log(e))
    })
    .catch((e) => console.log(e))
}
</script>

<style lang="scss">
.manage-project {
  .preview-card {
    width: 467px;
    height: 203px;
  }
}
</style>
