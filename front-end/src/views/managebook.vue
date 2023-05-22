<script setup>
import navcomp from '../components/navbar.vue'
import axios from '@/plugins/axios';
</script>

<template>
    <div id="app">
        <navcomp></navcomp>
        <h1 class="text-5xl text-center text-black underline underline-offset-8 my-8"><b>Manage books</b></h1><br><br>
        <div class="w-full flex justify-center" style="height: 70px;"><router-link to="/add"><button class = "bg-gray-900 text-white rounded-lg" style="width: 75px; height: 50px;">Add</button></router-link></div>
        <table class = "w-full text-center border-collapse">
            <thead>
                <th class = "border-4 border-stone-500">Id</th>
                <th class = "border-4 border-stone-500">Name</th>
                <th class = "border-4 border-stone-500">Type</th>
                <th class = "border-4 border-stone-500">Author</th>
                <th class = "border-4 border-stone-500">Img</th>
                <th class = "border-4 border-stone-500">Action</th>
            </thead>
            <tbody v-for = "items in items">
                <td class="border-4 border-stone-500">{{ items.book_id }}</td>
                <td class="border-4 border-stone-500">{{ items.book_name }}</td>
                <td class="border-4 border-stone-500">{{ items.book_type }}</td>
                <td class="border-4 border-stone-500">{{ items.author }}</td>
                <td class="border-4 border-stone-500 justify-center" style="width:200px;"><img :src ="getimg(items.book_img)" style = "width:200px; height:200px;"></td>
                <td class="border-4 border-stone-500" style="width: 300px;">
                    <router-link :to="{ name: 'editbook', params: { id: items.book_id } }"><button class = "bg-yellow-400 rounded-lg" style="width: 75px; height: 50px;">Edit</button></router-link>
                    <button class="ml-4 bg-red-400 rounded-lg" style="width: 75px; height: 50px;" @click="deletebooks(items.book_id)">Delete</button>
                </td>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
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
    deletebooks(del){

      this.items = this.items.filter((x) =>{
        return x.book_id != del
      })
      alert("comp")
      axios
        .delete(`http://localhost:3000/books/${del}`, {
        })
        .then((response) => {
          // this.items = response.data.books;
          console.log(this.items)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
</script>