import axios from 'axios'
import router from '@/routers'

const authClient = axios.create({
  baseURL: import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:8102'
})

authClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status >= 500) {
      router.push({ name: 'error_500' })
    }
    return Promise.reject(error)
  }
)

export default authClient

