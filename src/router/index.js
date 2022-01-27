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
      },
      {
        path: 'songmore/:title1',
        component: () => import('../views/SongMore.vue')
      }
    ]
  },
  {
    path: '/video',
    component: () => import('../views/Video.vue'),
    children: [
      {
        path: 'videoplayer/:id/:title',
        component: () => import('../views/VideoPlayer.vue')
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
  },
  {
    path: '/seemore/:title1',
    component: () => import('../views/Seemore.vue'),
    children: [
      {
        path: 'videoplayer/:id/:title',
        component: () => import('../views/VideoPlayer.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
