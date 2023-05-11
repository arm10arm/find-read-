<template>
    <nav class = "bg-zinc-800 w-auto h-14 flex">
        <!--first nav-items-->
          <div class="flex items-center justify-start h-full w-full ml-5">
            <router-link to = "/home"><span class="text-slate-200 hover:text-black flex">
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              </span>FIND-READ</span></router-link>
              <router-link to=""><span class="ml-5 text-slate-200 hover:text-black">About us</span></router-link>
              <router-link to="/catagories"><span  class="ml-5 text-slate-200 hover:text-black">Categories</span></router-link>
              <router-link to="/wishlist"><span  class="ml-5 text-slate-200 hover:text-black">Wishlist</span></router-link>
          </div>
        <!------------------->

        <!--second-items----->

        <div class="flex items-center justify-end h-full w-full mr-5 gap-4">
          <router-link to="/signup"><button class="w-24 h-10 rounded-lg bg-zinc-700"><span  class=" text-slate-200">Sign up</span></button></router-link>
          <router-link to="/login"><button class="w-24 h-10 rounded-lg bg-zinc-700"><span  class=" text-slate-200">Log in</span></button></router-link>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>

        </div>
        <!------------------->
    </nav><br><br>
</template>
<script>
export default {

}
</script>
<style>

</style>