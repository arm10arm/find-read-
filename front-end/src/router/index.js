import { createRouter, createWebHistory } from 'vue-router'
import introview from '../views/intro.vue'
import HomeView from '../views/home.vue'
import addView from '../views/add.vue'
import login from '../views/login.vue'
import signup from '../views/signup.vue'
import wishlist from '../views/wishlist.vue'
import catagories from '../views/categories.vue'
import books from '../views/books.vue'
import admin from '../views/admin.vue'
import managebooks from '../views/managebook.vue'
import user from '../views/user.vue'
import banuser from '../views/banuser.vue'
import editbook from '../views/editbook.vue'
import profile from '../views/profile.vue'
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
    ,
    {
      path: '/login',
      name: 'login',
      component: login
    }
    ,
    {
      path: '/signup',
      name: 'signup',
      component: signup
    }
    ,
    {
      path: '/wishlist',
      name: 'wishlist',
      component: wishlist
    }
    ,
    {
      path: '/catagories',
      name: 'catagories',
      component: catagories
    }
    ,
    {
      path: '/books/:id',
      name: 'books',
      component: books
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    }
    ,
    {
      path: '/managebooks',
      name: 'managebooks',
      component: managebooks
    }
    ,
    {
      path: '/user',
      name: 'user',
      component: user
    }
    ,
    {
      path: '/banuser',
      name: 'banuser',
      component: banuser
    },
    {
      path: '/editbook/:id',
      name: 'editbook',
      component: editbook
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    }
  ]
})

export default router
