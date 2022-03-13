import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyLoad from 'vue3-lazyload'
// import MetaInfo from 'vue-meta-info'
import VideoPlayer from 'vue-video-player/src'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import './util/rem'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)

fastclick.attach(document.body)
app.use(VueLazyLoad, {
  loading: './assets/images/loading.png',
  error: './assets/images/loading.png'
})
app.use(VideoPlayer)
app.use(ElementPlus)
app.use(store).use(router).mount('#app')
