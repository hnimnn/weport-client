import axios from 'axios'
import { ref } from 'vue'
// import { useRouter } from 'vue-router'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  withCredentials: false,
})
export default function useProjects() {
  const projects = ref([])
  // const project = ref([])
  // const error = ref([])
  // const router = useRouter()

  const getProjects = async () => {
    await instance
      .get('/projects')
      .then((response) => {
        console.log(response)
        projects.value = response.data
      })
      .catch((e) => console.log(e))
  }
  const createProject = async (data) => {
    await instance
      .post('/projects', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        console.log(response)
      })
      .catch((e) => console.log(e))
  }

  return { projects, getProjects, createProject }
}
