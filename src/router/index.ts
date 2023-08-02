import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/home/index.vue'
import ProfilePage from '../views/profile/Profile.vue'
import UpdateProfile from '../views/profile/UpdateProfile.vue'
import Signin from '../views/signin/index.vue'
import Signup from '../views/signup/index.vue'
import CreateProject from '../views/projects/create/index.vue'
import ManageProject from '../views/projects/manage/index.vue'
import ManageProjectAdmin from '../views/admin/ManageProject.vue'
import UpdateProject from '../views/projects/update/index.vue'
import SavedProject from '../views/projects/saved/index.vue'
import ProjectDetail from '../views/projects/detail/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/profile/:id?',
    name: 'Profile',
    component: ProfilePage,
  },
  {
    path: '/update-profile',
    name: 'UpdateProfile',
    component: UpdateProfile,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('user')) {
        next()
      } else next({ name: 'Signin' })
    },
  },

  {
    path: '/create-project',
    name: 'CreateProject',
    component: CreateProject,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('user')) {
        if (JSON.parse(localStorage.getItem('user') || '')?.role === 2) next()
        else next({ name: 'Home' })
      } else next({ name: 'Signin' })
    },
  },
  {
    path: '/manage-project',
    name: 'ManageProject',
    component: ManageProject,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('user')) {
        if (JSON.parse(localStorage.getItem('user') || '')?.role === 2) next()
        else next({ name: 'Home' })
      } else next({ name: 'Signin' })
    },
  },
  {
    path: '/update-project/:id?',
    name: 'UpdateProject',
    component: UpdateProject,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('user')) {
        next()
      } else next({ name: 'Signin' })
    },
  },
  {
    path: '/saved-project',
    name: 'SavedProject',
    component: SavedProject,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('user')) {
        if (JSON.parse(localStorage.getItem('user') || '')?.role === 2) next()
        else next({ name: 'Home' })
      } else next({ name: 'Signin' })
    },
  },
  {
    path: '/project-detail/:id?',
    name: 'ProjectDetail',
    component: ProjectDetail,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },

  // Admin ----------------
  {
    path: '/admin/manage-project',
    name: 'ManageProjectAdmin',
    component: ManageProjectAdmin,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('user')) {
        if (JSON.parse(localStorage.getItem('user') || '')?.role === 1) next()
        else next({ name: 'Home' })
      } else next({ name: 'Signin' })
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
