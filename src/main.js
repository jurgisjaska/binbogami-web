// tabler & fontawesome
import '@tabler/core/scss/tabler.scss'
import '@tabler/core/js/tabler.js'
import '@tabler/core/js/tabler-theme.js'
import '@tabler/icons-webfont/dist/tabler-icons.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// binbogami
import '@/assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import { createPinia } from 'pinia'

import { appApi, authApi } from '@/api'

const pinia = createPinia()
const app = createApp(App)

app.provide('authApi', authApi)
app.provide('appApi', appApi)

app.use(router)
app.use(pinia)
app.mount('#app')
