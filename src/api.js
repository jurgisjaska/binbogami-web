import axios from "axios"
import router from "./router"

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL || "http://localhost:8101"
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("binbogami_token")

    // @todo this should be changed later
    if (token && config.url.includes("/v1/")) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    if (error.response.status === 401) {
      router.push("/signin")
    }
    return Promise.reject(error);
  }
);

export default api
