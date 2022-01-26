import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'

// 按需加载
// const Recommend = (resolve) => {
//   import('../views/Recommend').then((module) => {
//     resolve(module)
//   })
// }
// const Detail = (resolve) => {
//   import('../views/Detail').then((module) => {
//     resolve(module)
//   })
// }
// const VideoPlayer = (resolve) => {
//   import('../views/VideoPlayer').then((module) => {
//     resolve(module)
//   })
// }
// const Singer = (resolve) => {
//   import('../views/Singer').then((module) => {
//     resolve(module)
//   })
// }
// const Video = (resolve) => {
//   import('../views/Video').then((module) => {
//     resolve(module)
//   })
// }
// const Rank = (resolve) => {
//   import('../views/Rank').then((module) => {
//     resolve(module)
//   })
// }
// const Search = (resolve) => {
//   import('../views/Search').then((module) => {
//     resolve(module)
//   })
// }
// const Account = (resolve) => {
//   import('../views/Account').then((module) => {
//     resolve(module)
//   })
// }
// const Seemore = (resolve) => {
//   import('../views/Seemore').then((module) => {
//     resolve(module)
//   })
// }

const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import(/* webpackChunkName: "about" */ '../views/Recommend.vue'),
    children: [
      {
        path: 'detail/:id/:type',
        component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
