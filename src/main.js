import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/bulma/css/bulma.css'
import '../node_modules/bulmaswatch/slate/bulmaswatch.min.css'
import axios from 'axios'

axios.defaults.baseURL = 'https://localhost:7141/api/'

createApp(App).use(router).mount('#app')
