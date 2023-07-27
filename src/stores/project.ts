import axios from 'axios'
import { ref } from 'vue'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  withCredentials: false,
})
type Project = {
  name: string
  thumbnail: string
  description: string
  user_id: number
  tags: string
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
  const getProjectsByUserId = async (header) => {
    await instance
      .get('/user/projects', {
        headers: header,
      })
      .then((response) => {
        projects.value = response.data
        console.log(response)
      })
      .catch((e) => console.log(e))
  }
  const createProject = async (data: Project) => {
    try {
      console.log(data)

      errors.value = false
      await instance.post('/projects', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } catch (error) {
      console.log(error)
      errors.value = error.response.data.errors
    }
  }
  const deleteProject = async (id: number) => {
    try {
      await instance.delete('/projects/' + id)
      await getProjectsByUserId({ user_id: JSON.parse(localStorage.getItem('user_id')) })
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

    await instance
      .post(`/projects/${id}?_method=PUT`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
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
