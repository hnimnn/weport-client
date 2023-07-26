import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/home/index.vue'
import CreateProject from '../views/projects/create/index.vue'
import ManageProject from '../views/projects/manage/index.vue'
import UpdateProject from '../views/projects/update/index.vue'
import ProjectDetail from '../views/projects/detail/index.vue'

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
  {
    path: '/update-project/:id?',
    name: 'UpdateProject',
    component: UpdateProject,
  },
  {
    path: '/project-detail/:id?',
    name: 'ProjectDetail',
    component: ProjectDetail,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
