import { createRouter, createWebHistory } from 'vue-router'
import introview from '../views/intro.vue'
import HomeView from '../views/home.vue'
import addView from '../views/add.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'intro',
      component: introview
    }
    ,
    {
      path: '/home',
      name: 'home',
      component: HomeView
    }
    ,
    {
      path: '/add',
      name: 'add',
      component: addView
    }
  ]
})

export default router
