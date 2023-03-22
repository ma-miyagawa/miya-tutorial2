import Vue from 'vue'
import VueRouter from 'vue-router'

import BookApp from '@/view/BookApp.vue'
import FormApp from '@/view/FormApp.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Home',
    path: '/',
    component: BookApp
  },
  {
    name: 'Form',
    path: '/Form/:id',
    component: FormApp,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
