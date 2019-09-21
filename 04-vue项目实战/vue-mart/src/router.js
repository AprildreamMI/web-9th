import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/Cart.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('./views/About.vue'),
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, form, next) => {
  // 如果需要登录
  if (to.meta.auth) {
    // 拿到token
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      // 没有token去登录
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      })
    }
  } else {
    next()
  }
})

export default router
