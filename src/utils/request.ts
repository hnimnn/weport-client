import axios from 'axios'
import { getDataOnCookies } from '.'

const request = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/auth/v1',
})

request.interceptors.request.use(
  async (config) => {
    const now = new Date().getTime()
    const expires = new Date(JSON.parse(localStorage.getItem('token_expires') || '')).getTime()
    console.log(expires < now)

    if (expires < now) {
      try {
        await axios
          .get('http://127.0.0.1:8000/api/auth/v1/refresh', {
            params: { refresh_token: getDataOnCookies('refresh_token') },
          })
          .then((response) => {
            document.cookie = `access_token=${response.data.access_token}; max-age=${response.data.expires_in}; path=/;`
          })

        return config
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    return Promise.reject(err)
  }
)
export { request }
