import { createRouter, createWebHistory } from 'vue-router'

import CreateUserView from '@/views/CreateUserView.vue'
import HomeView from '@/views/HomeView.vue'
import ListView from '@/views/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/list',
      name: 'list',
      component: ListView
    },
    {
      path: '/create-user',
      name: 'create-user',
      component: CreateUserView
    }
  ]
})

export default router
