import axios from 'axios'

const authClient = axios.create({
  baseURL: import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:8102'
})

export default authClient
