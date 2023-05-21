<template>
  <div>
    <nav class = "bg-zinc-800 w-auto h-14 flex">
        <!--first nav-items-->
          <div class="flex items-center justify-start h-full w-full ml-5">
            <router-link to = "/home"><span class="text-slate-200 hover:text-black flex">
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              </span>FIND-READ</span></router-link>
              <router-link to="/catagories"><span  class="ml-5 text-slate-200 hover:text-black">Categories</span></router-link>
              <router-link to="/wishlist"><span  class="ml-5 text-slate-200 hover:text-black">Wishlist</span></router-link>
              <div v-if="role == 'admin'">
                <router-link to="/admin"><span class="ml-5 text-slate-200 hover:text-black">Admin</span></router-link>
              </div>
          </div>
        <!------------------->

        <!--second-items----->
          <router-link to="/signup"><button v-if="!user" class="w-24 h-10 rounded-lg bg-zinc-700 my-2 mx-2"><span  class=" text-slate-200">Sign up</span></button></router-link>
          <router-link to="/login"><button v-if="!user" class="w-24 h-10 rounded-lg bg-zinc-700 my-2 mx-2"><span  class=" text-slate-200">Log in</span></button></router-link>
          <router-link to="/profile"><button v-if="user" class="w-24 h-10 rounded-lg bg-zinc-700 my-2 mx-2"><span  class=" text-slate-200">My Profile</span></button></router-link>
          <button v-if="user" class="w-24 h-10 rounded-lg bg-zinc-700 my-2 mx-2"><span class=" text-slate-200" @click="logout()">Log out</span></button>

        <!------------------->
    </nav>
  </div>
</template>
<script>
import axios from '@/plugins/axios'
export default {
  data() {
        return {
            user: null,
            role: null,
            ban: null
        }
    },
    mounted () {
        this.onAuthChange()
    },
    methods: {
      logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('ban')
      this.$emit('auth-change')
      window.location = '/'
    },
    onAuthChange () {
      const token = localStorage.getItem('token')
      if (token) {
        this.getUser()
      }
    },
    getUser () {
      axios.get('/user/me').then(res => {
        this.user = res.data
        this.role = res.data.role
        this.ban = res.data.ban
        if (this.role == 'admin') {
          localStorage.setItem('role', 'admin')
        }
        
        if (this.ban == 1) {
          this.logout()
          alert('You are banned from this website!')
        }
      })
    },
  }
}

</script>
<style>

</style>