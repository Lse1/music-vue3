import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyLoad from 'vue3-lazyload'

const app = createApp(App)

fastclick.attach(document.body)
app.use(VueLazyLoad, {
  loading: './assets/images/loading.png',
  error: './assets/images/loading.png'
})
app.use(store).use(router).mount('#app')
