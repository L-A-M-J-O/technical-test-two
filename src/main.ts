import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './app/router/index'
import App from './app/ui/App.vue'
import './assets/style.css'

createApp(App).mount('#app')

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
