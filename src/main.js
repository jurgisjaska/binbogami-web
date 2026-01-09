// bootstrap
import "bootstrap/scss/bootstrap.scss"

// tabler
import "@tabler/core/scss/tabler.scss"
import "@tabler/core/js/tabler.js"
import "@tabler/core/js/tabler-theme.js"

// binbogami
import "@/asset/main.scss"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { createPinia } from "pinia";

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount("#app")
