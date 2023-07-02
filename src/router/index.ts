import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import services from '@/services'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
      meta: {
        hasAuth: true
      }
    }
  ]
})

router.beforeEach(async (to, _from, next) => {
  const store = useUserStore()
  const token = window.localStorage.getItem('token')


  if (token && !store.currentUser) {
    const user = await services.user.getMe()
    store.setCurrentUser(user)
  }

  if (to.meta.hasAuth) {
    if (!token) {
      store.clearCurrentUser()
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
