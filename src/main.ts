import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/styles/global.scss'

import 'tippy.js/dist/tippy.css'
createApp(App).use(router).use(createPinia()).mount('#app')
