import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/host/:pid',
    name: 'Host',
    props: true,
    component: () => import('../views/Host.vue')
  },
  {
    path: '/join/:pid',
    name: 'Join',
    props: true,
    component: () => import('../views/Join.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
