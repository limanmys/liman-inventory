// Vue app
import { createApp } from "vue"
import { autoAnimatePlugin } from "@formkit/auto-animate/vue"

// Store app
import { createPinia } from "pinia"

// Hot reload support on embedded vite applications
import "vite/modulepreload-polyfill"

import App from "./views/layouts/App.vue"
import router from "./router"
import naive from "naive-ui"
import i18nInstance from "./utils/i18n"
import VueApexCharts from "vue3-apexcharts"
import mitt from "mitt"

const app = createApp(App)
const pinia = createPinia()
const emitter = mitt()

app.use(pinia)
app.use(router)
app.use(naive)
app.use(autoAnimatePlugin)
app.use(i18nInstance)
app.use(VueApexCharts)
app.config.globalProperties.emitter = emitter

app.mount("#app")
