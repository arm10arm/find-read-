<template>
    <div id="app">
    <nav class="bg-zinc-800 w-auto h-14 flex">
      <!--first nav-items-->
      <div class="flex items-center justify-start h-full w-full ml-5">
        <a href="index.html" class="text-slate-200 hover:text-black flex">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </span>FIND-READ</a>
        <a href="about-us.html" class="ml-5 text-slate-200 hover:text-black">About us</a>
        <a href="categories.html" class="ml-5 text-slate-200 hover:text-black">Categories</a>
        <a href="shop.html" class="ml-5 text-slate-200 hover:text-black">Shop</a>
        <a href="wishlist.html" class="ml-5 text-slate-200 hover:text-black" @click="setwish(wish)">Wishlist</a>
      </div>
      <!------------------->

      <!--second-items----->

      <div class="flex items-center justify-end h-full w-full mr-5 gap-4">
        <button class="w-24 h-10 rounded-lg bg-zinc-700	"><a href="signup.html" class=" text-slate-200">Sign up</a></button>
        <button class="w-24 h-10 rounded-lg bg-zinc-700	"><a href="login.html" class=" text-slate-200">Log in</a></button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-12 h-8">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>

      </div>
      <!------------------->
    </nav><br><br>

    <h1 class="text-5xl text-center text-black underline underline-offset-8">Categories</h1><br><br>
    <div class="fixse flex w-full justify-end">
      <label for="cate">หมวดหนังสือ: </label>
      <select class="border-black" name="book_type" v-model="book_type">
        <option selected></option>
        <option>Howto</option>
        <option>Literature</option>
        <option>Business</option>
        <option>Garden</option>
        <option>Novel</option>
      </select>
    </div><br><br>

    <section class="w-full h-auto flex justify-center">
      <div class="grid grid-cols-5 gap-x-12 gap-y-14">
        <div v-for="items in sort_book" class="h-full w-48 mr-6">
          <div class="top flex justify-center w-full h-48">
            <img class="h-full object-fit" :src="items.images">
          </div>
          <div class="content text-zinc-800	 w-auto h-32 text-sm">
            <p class="pt-4">ชื่อ: {{items.name}}</p>
            <p class="pt-1">แนว: {{items.type}}</p>
            <p class="pt-1">ผู้เขียน: {{items.author}}</p>
            <p class="pt-1 pb-2">สํานักพิมพ์: {{items.publish}}</p>
          </div><br><br>
          <button class="w-full bg-zinc-900 text-zinc-300	h-10 rounded-lg"
            @click="addshowiaaa(items)">อ่านเพิ่มเติม</button>
          <span style="font-family: 'Gloock', serif;"><button
              class="bg-zinc-900 w-full h-12 mt-4 rounded-lg text-2xl text-zinc-300" @click="addwish(items)">Add to
              wishlist</button></span>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {

}
</script>
<style>

</style>