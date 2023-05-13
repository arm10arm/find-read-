<script setup>
import navcomp from '../components/navbar.vue'
import axios from "axios";
</script>

<template>
    <navcomp></navcomp>
    <div id="app">

        <h1 class="text-5xl text-center text-black underline underline-offset-8">Book</h1><br><br>

        <section class="w-full h-96 flex justify-center items-center">
            <div class="container h-full flex" style="width: 900px;">
                <div class="left w-64">
                    <div class="img-container w-full h-80 flex justify-center">
                        <img :src="getimg(item.book_img)">
                    </div>
                    <button class="bg-zinc-900 w-full h-12 mt-4 rounded-lg text-2xl text-zinc-300"
                        style="font-family: 'Gloock', serif;" v-if="like.length === 0 || like.like === 0">Like ({{
                            like.length }})</button>
                    <button class="bg-red-600 w-full h-12 mt-4 rounded-lg text-2xl text-zinc-300"
                        style="font-family: 'Gloock', serif;" v-else>UnLike ({{
                            like.length }})</button>
                </div>
                <div class="right ml-4" style="width: 600px;">
                    <div class="content-top w-full">
                        <p>Name: {{ item.book_name }}</p>
                        <p>Type: {{ item.book_type }}</p>
                        <p>Author: {{ item.author }}</p>
                        <p>Publisher: {{ item.publisher }}</p>
                        <p>Title:</p>
                    </div>
                    <div class="content-bottom flex mt-2 ml-2">
                        <div class="info" style="width: 650px; height: 245px;">
                            <p>{{ item.contents }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section><br>

        <section class="w-full h-96 flex justify-center items-center mt-4">
            <div class="container h-full" style="width: 900px;">
                <div class="comment w-full h-14 flex">
                    <button class="w-24 h-10 bg-slate-600 mr-4 mt-2 rounded-lg" @click="addComment()">Post</button>
                    <input type="text" class="w-full  bg-slate-200 rounded-lg" placeholder="Write your comment here"
                        v-model="comment" name="comment">
                </div><br>
                <div class="box-comment w-full pt-4" style="height: 500px; overflow: scroll;">
                    <h1 v-for="comment in comments">{{ comment.comment }}</h1>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            item: {},
            comments: [],
            like: [],
            comment: ''
        }
    },
    created() {
        axios.get(`http://localhost:3000/book/${this.$route.params.id}`)
            .then((response) => {
                this.item = response.data.book[0];
                this.like = response.data.like;
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get(`http://localhost:3000/comments/${this.$route.params.id}`)
            .then((response) => {
                this.comments = response.data.comment;
                console.log(this.comments)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    ,
    methods: {
        getimg(img) {
            return "http://localhost:3000/" + img;
        },
        addComment() {
            axios
                .post(`http://localhost:3000/${this.$route.params.id}/comments`, {
                    comment: this.comment,
                })
                .then((response) => {
                    this.comment.push(response.data);
                })
                .catch((error) => {
                    this.error = error.response.data.message;
                });
            this.comment = "";
        },
    }
}
</script>