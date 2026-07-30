import axios from 'axios'
import router from '@/routers'
import { useTokenStore } from '@/stores/token.js'
import { useUserStore } from '@/stores/user.js'

const appClient = axios.create({
  baseURL: import.meta.env.VITE_APP_URL || 'http://localhost:8101'
})

appClient.interceptors.request.use(
  (config) => {
    // @todo this feels incorrect
    const token = localStorage.getItem('binbogami_token')

    // @todo this should be changed later
    if (token && config.url.includes('v1/')) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

appClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      useTokenStore().clear()
      useUserStore().clear()

      router.push('/signin')
    }
    return Promise.reject(error)
  }
)

export default appClient
