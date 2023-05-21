<script setup>
import navcomp from '../components/navbar.vue'
import axios from '@/plugins/axios';
</script>
<template>
  <div id="app">
    <navcomp></navcomp>
    <h1 class="text-5xl text-center text-black underline underline-offset-8 my-8"><b>Categories</b></h1><br><br>
    <div class="fixse flex w-full justify-end">
      <label for="cate" class="text-xl"><b>หมวดหนังสือ: </b></label>
      <select class="border-2 border-black rounded-sm mx-4" name="book_type" v-model="book_type">
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
        <div v-for="items in items" class="h-full w-48 mr-6">
          <div class="top flex justify-center w-full h-48">
            <img class="h-full object-fit" :src="getimg(items.book_img)">
          </div>
          <div class="content text-zinc-800	 w-auto h-32 text-sm">
            <p class="pt-4 break-all">ชื่อ: {{ items.book_name }}</p>
            <p class="pt-1 break-all">แนว: {{ items.book_type }}</p>
            <p class="pt-1 break-all">ผู้เขียน: {{ items.author }}</p>
            <p class="pt-1 pb-2 break-all">สํานักพิมพ์: {{ items.publisher }}</p>
          </div><br><br>
          <router-link :to="{ name: 'books', params: { id: items.book_id } }"><button
              class="w-full bg-zinc-900 text-zinc-300	h-10 rounded-lg">อ่านเพิ่มเติม</button></router-link>
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
      items: []
    }
  },
  mounted() {
    this.getbooks();
  },
  methods: {
    getbooks() {
      axios
        .get("http://localhost:3000/books", {
        })
        .then((response) => {
          this.items = response.data.books;
          console.log(this.items)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getimg(img) {
      return "http://localhost:3000/" + img;
    },
    createwish(seen){
      console.log(seen)
      axios.post("http://localhost:3000/wishlist", {sent:seen})
      .then((response) =>{
        console.log(response)
        this.$router.push({ path: '/wishlist' })
      })
      .catch((err) => {
          console.log(err);
        });
    }
  }
}

</script>
<style></style>