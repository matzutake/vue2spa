import VueRouter from 'vue-router'
import Vue from 'vue'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.key) {
    return next({ name: 'login' })
  }
  return next()
})

export default router
