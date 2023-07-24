import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/home/index.vue'
import CreateProject from '../views/projects/create/index.vue'
import ManageProject from '../views/projects/manage/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/create-project',
    name: 'CreateProject',
    component: CreateProject,
  },
  {
    path: '/manage-project',
    name: 'ManageProject',
    component: ManageProject,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router