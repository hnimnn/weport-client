import axios from 'axios'
import { ref } from 'vue'
import { getDataOnCookies } from '@/utils'
import { request } from '@/utils/request'
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/auth/v1',
  withCredentials: false,
})
type Project = {
  name: string
  thumbnail: string
  description: string
  user_id: number
  tags: string
  source: string
  price: number
}
export default function useProjects() {
  const projects = ref([])
  const project = ref([])
  const errors = ref([])

  const getProjects = async () => {
    await instance
      .get('/projects')
      .then((response) => {
        projects.value = response.data
        console.log(response)
      })
      .catch((e) => console.log(e))
  }
  const getProjectsByUserId = async () => {
    await request
      .get('/user/projects', {
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
  const createProject = async (data: Project) => {
    try {
      errors.value = false
      console.log(data)
      await request.post('/projects', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getDataOnCookies('access_token')}`,
        },
      })
    } catch (error) {
      console.log(error)
      errors.value = error.response.data.errors
    }
  }
  const deleteProject = async (id: number) => {
    try {
      await request.delete('/projects/' + id, {
        headers: { Authorization: `Bearer ${getDataOnCookies('access_token')}` },
      })
      await getProjectsByUserId()
    } catch (error) {
      console.log(error)
    }
  }
  const getProject = async (id: number) => {
    await instance
      .get('/projects/' + id)
      .then((response) => {
        project.value = response.data
      })
      .catch((e) => console.log(e))
  }
  const updateProject = async (data: Project, id: number) => {
    errors.value = false

    await request
      .post(`/projects/${id}?_method=PUT`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getDataOnCookies('access_token')}`,
        },
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => (errors.value = error.response.data.errors))
  }

  return {
    projects,
    project,
    errors,
    getProjects,
    createProject,
    deleteProject,
    getProject,
    updateProject,
    getProjectsByUserId,
  }
}
