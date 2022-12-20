import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import store from '../store/index'
import { ElMessage } from 'element-plus'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: [
      {
        path: '/main/discussion',
        name: 'discussion',
        component: () => import('@/views/main/discussion/discussion.vue'),
        meta: { title: '讨论区', index: '4', requestAuth: true }
      },
      {
        path: '/main/game/snake',
        name: 'snake',
        component: () => import('@/views/main/game/snake/snake.vue'),
        meta: { title: '贪吃蛇', index: '1-1', requestAuth: true }
      },
      {
        path: '/main/login',
        name: 'login',
        component: () => import('@/views/main/login/login.vue'),
        meta: { title: '登录/注册', requestAuth: false }
      },
      {
        path: '/main/messageboard',
        name: 'messageBoard',
        component: () => import('@/views/main/messageBoard/messageBoard.vue'),
        meta: { title: '留言板', index: '5', requestAuth: true }
      },
      {
        path: '/main/ranklist',
        name: 'rankList',
        component: () => import('@/views/main/rankList/rankList.vue'),
        meta: { title: '排行榜', index: '3', requestAuth: true }
      },
      {
        path: '/main/record',
        name: 'record',
        component: () => import('@/views/main/record/record.vue'),
        meta: { title: '对战列表', index: '2', requestAuth: true }
      },
      {
        path: '/main/homepage',
        name: 'homePage',
        component: () => import('@/views/main/homePage/homePage.vue'),
        meta: { title: '首页', index: '0', requestAuth: false }
      },
      {
        path: '/main/botinfo',
        name: 'botInfo',
        component: () => import('@/views/main/botInfo/botInfo.vue'),
        meta: { title: '我的Bot', requestAuth: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to) => {
  if (
    to.meta.requestAuth &&
    (!store.state.login.is_login || store.state.login.is_login === undefined)
  ) {
    ElMessage({
      showClose: true,
      message: '您还未登录，请登录后继续访问',
      type: 'error'
    })
    router.push('/main/login')
  } else if (to.path === '/main') {
    return '/main/homepage'
  } else {
    return
  }
})
export default router
