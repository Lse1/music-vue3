import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('../views/Recommend.vue'),
    children: [
      {
        path: 'detail/:id/:type',
        component: () => import('../views/Detail.vue')
      }
    ]
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('../views/Singer.vue'),
    children: [
      {
        path: 'detail/:id/:type',
        component: () => import('../views/Detail.vue')
      }
    ]
  },
  {
    path: '/rank',
    component: () => import('../views/Rank.vue'),
    children: [
      {
        path: 'detail/:id/:type',
        component: () => import('../views/Detail.vue')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/account',
    component: () => import('../views/Account.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
