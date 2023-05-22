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
      meta: { login: true },
      component: addView
    }
    ,
    {
      path: '/login',
      name: 'login',
      meta: { guest: true },
      component: login
    }
    ,
    {
      path: '/signup',
      name: 'signup',
      meta: { guest: true },
      component: signup
    }
    ,
    {
      path: '/wishlist',
      name: 'wishlist',
      meta: { login: true },
      component: wishlist
    }
    ,
    {
      path: '/catagories',
      name: 'catagories',
      meta: { login: true },
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
      meta: { login: true, role: true },
      component: admin
    }
    ,
    {
      path: '/managebooks',
      name: 'managebooks',
      meta: { login: true, role: true },
      component: managebooks
    }
    ,
    {
      path: '/user',
      name: 'user',
      meta: { login: true, role: true },
      component: user
    }
    ,
    {
      path: '/banuser',
      name: 'banuser',
      meta: { login: true, role: true },
      component: banuser
    },
    {
      path: '/editbook/:id',
      name: 'editbook',
      meta: { login: true, role: true },
      component: editbook
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { login: true },
      component: profile
    },
  ]
})

export default router

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  const isAdmin = localStorage.getItem('role')

  if (to.meta.login && !isLoggedIn) {
    next({ path: '/login' })
  }

  if (to.meta.guest && isLoggedIn) {
    next({ path: '/home'})
  }

  if (to.meta.role && isAdmin != 'admin') {
    next({ path: '/home'})
  }

  next()
})