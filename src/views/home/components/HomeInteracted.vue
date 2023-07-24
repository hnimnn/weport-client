<template>
  <div class="home-interacted">
    <div class="title">
      <p class="syne-bold mb-12">
        <span class="color-text syne-bold">Most-Interacted</span> Contributor In 24hrs
      </p>
    </div>
    <div class="content grid px-16 grid-cols-1 md:grid-cols-2 md:px-0 xl:grid-cols-3 gap-9">
      <div v-for="interacted in interacteds" :key="interacted.id" class="h-28">
        <InteractedTag :info="interacted" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InteractedTag from '@/components/InteractedTag.vue'
export default defineComponent({
  name: 'HomeInteracted',
  components: {
    InteractedTag,
  },

  data() {
    return {
      interacteds: [
        {
          id: 1,
          name: 'Minh',
          avatar: 'https://i.pinimg.com/564x/9d/ed/45/9ded459111de77592807ca19289cec95.jpg',
          project: 'School Project',
          tags: ['Portfolio', 'Web', 'Study'],
          like: 752,
          view: 1653,
        },
        {
          id: 2,
          name: 'Huy',
          avatar: 'https://i.pinimg.com/564x/30/d0/3b/30d03b6f1810117b6a3fd5ac2d70503f.jpg',
          project: 'School Project',
          tags: ['Portfolio', 'Web', 'Study'],
          like: 752,
          view: 1653,
        },
        {
          id: 3,
          name: 'Hieu',
          avatar: 'https://i.pinimg.com/564x/73/93/d0/7393d0446647c58729adb1ec520396a0.jpg',
          project: 'Elearn- Elearning Landing Figma',
          tags: ['Portfolio', 'Web', 'Study'],
          like: 752,
          view: 16053,
        },
        {
          id: 4,
          name: 'Ha Le Ky Anh',
          avatar: 'https://i.pinimg.com/564x/65/ab/18/65ab1892604f4c4c4409ea3a7b8a189e.jpg',
          project: 'School Project',
          tags: ['Portfolio', 'Web', 'Study'],
          like: 752,
          view: 1653,
        },
        {
          id: 5,
          name: 'Son',
          avatar: 'https://i.pinimg.com/564x/39/99/e1/3999e1198eb91b8b1244cd7df1f31d76.jpg',
          project: 'School Project',
          tags: ['Portfolio', 'Web', 'Study'],
          like: 752,
          view: 251038,
        },
        {
          id: 6,
          name: 'Duc',
          avatar: 'https://i.pinimg.com/564x/5b/bd/52/5bbd52752adef3903b5c610906f28b6b.jpg',
          project: 'School Project',
          tags: ['Portfolio', 'Web', 'Study'],
          like: 752,
          view: 1653,
        },
      ],
    }
  },
})
</script>
<style lang="scss">
.home-interacted {
  .title {
    text-align: center;
    p {
      font-size: 30px;
    }
  }
}
</style>
