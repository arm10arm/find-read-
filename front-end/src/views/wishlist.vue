<script setup>
import navcomp from '../components/navbar.vue'
import axios from '@/plugins/axios';
</script>

<template>
  <div id='app'>
    <navcomp></navcomp>
    <h1 class="text-5xl text-center text-black underline underline-offset-8 my-8"><b>Wishlist</b></h1><br><br>

    <section class="w-full h-auto flex justify-center">
      <div class="grid grid-cols-5 gap-x-12 gap-y-14">
        <div class="h-full w-48 mr-6" v-for="items in items">
          <div class="top flex justify-center w-full h-48">
            <img class="h-full object-fit" :src="getimg(items.book_img)">
          </div>
          <div class="content text-zinc-800	 w-auto h-32 text-sm">
            <p class="pt-4">ชื่อ:{{ items.book_name }}</p>
            <p class="pt-1">แนว:{{ items.book_type }}</p>
            <p class="pt-1 pb-2">ผู้เขียน:{{ items.author }}</p>
            <p class="pt-1 pb-2">สํานักพิมพ์:{{ items.publisher }}</p>
          </div>
          <router-link :to="{ name: 'books', params: { id: items.book_id } }"><button
              class="w-full bg-zinc-900 text-zinc-300	h-10 rounded-lg">อ่านเพิ่มเติม</button></router-link>
          <button class="w-full bg-red-500 text-zinc-300	h-10 rounded-lg mt-5" @click="createwish(items)">นำออกจาก
            Wishlist</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      items: [],
      status: null
    }
  },
  mounted() {
    this.getwish();
  },
  methods: {
    getwish() {
      axios
        .get("http://localhost:3000/wishlist", {
        })
        .then((response) => {
          this.items = response.data.wish;
          console.log(this.items)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getimg(img) {
      return "http://localhost:3000/" + img;
    },
    createwish(seen) {
      console.log(seen)

      axios.post("http://localhost:3000/wishlist", { sent: seen })
        .then((response) => {
          this.items = this.items.filter((x) => {
            return x.book_id != seen.book_id
          })
          this.status = response.data

        })
        .catch((err) => {
          console.log(err);
        });
      // this.getwish()
      // this.checkwish(seen,user)
    },
  }
}

</script>
