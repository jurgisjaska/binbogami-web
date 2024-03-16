import 'bulma/css/bulma.css'
import '@/asset/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"


axios.defaults.baseURL = import.meta.VITE_API_URL || "http://localhost:8101"
const app = createApp(App)

app.use(router)
app.mount('#app')
