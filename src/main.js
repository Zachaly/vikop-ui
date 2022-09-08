import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/bulma/css/bulma.css'
import '../node_modules/bulmaswatch/slate/bulmaswatch.min.css'
import axios from 'axios'
import { createPinia } from 'pinia'
import image from '@/plugins/image'

axios.defaults.baseURL = 'https://localhost:7141/api/'

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(image).mount('#app')
