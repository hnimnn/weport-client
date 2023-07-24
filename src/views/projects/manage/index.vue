<template>
  <div class="manage-project pt-12 pb-32 2xl:px-36 lg:px-32 px-12 grid justify-items-center">
    <HomeMenu />
    <div class="header syne-bold text-5xl">Create Amazing Project</div>
    <div class="content w-full justify-between flex px-10 py-10">
      <div class="grid grid-cols-3 gap-4">
        <div class="preview-card bg-black"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import HomeMenu from '@/components/Menu.vue'
import useProjects from '@/stores/project'

const { getProjects } = useProjects()

export default defineComponent({
  name: 'ManageProject',
  components: { HomeMenu },
  setup() {
    onMounted(() => {
      getProjects()
    })
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
