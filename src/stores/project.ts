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

  const getProjects = async () => {
    await instance
      .get('/projects')
      .then((response) => {
        projects.value = response.data
      })
      .catch((e) => console.log(e))
  }
  const createProject = async (data: Project) => {
    try {
      await instance.post('/projects', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } catch (error) {
      console.log(error)
    }
  }
  const deleteProject = async (id: number) => {
    try {
      await instance.delete('/projects/' + id)
      await getProjects()
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
    console.log(data)

    await instance
      .post(`/projects/${id}?_method=PUT`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        console.log(response)
      })
      .catch((e) => console.log(e))
  }

  return { projects, project, getProjects, createProject, deleteProject, getProject, updateProject }
}
