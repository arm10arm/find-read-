<script setup>
import navcomp from '../components/navbar.vue'
import axios from '@/plugins/axios';
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
                        style="font-family: 'Gloock', serif;"  @click="addlike()">Like ({{
                            like.length }})</button>
                    <!-- <button class="bg-red-600 w-full h-12 mt-4 rounded-lg text-2xl text-zinc-300"
                        style="font-family: 'Gloock', serif;" v-else>UnLike ({{
                            like.length }})</button> -->
                </div>
                <div class="right ml-4" style="width: 600px;">
                    <div class="content-top w-full">
                        <p class="break-all">Name: {{ item.book_name }}</p>
                        <p class="break-all">Type: {{ item.book_type }}</p>
                        <p class="break-all">Author: {{ item.author }}</p>
                        <p class="break-all">Publisher: {{ item.publisher }}</p>
                        <p class="break-all">Title:</p>
                    </div>
                    <div class="content-bottom flex mt-2 ml-2">
                        <div class="info" style="width: 650px; height: 245px;">
                            <p class="break-all">{{ item.contents }}</p>
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
                    <div class="flex" v-for="(comments, index) in comments" style="width: 800px; height: 170px;">
                        <div class="h-full" style="width: 150px;">
                            <p class="break-all">img</p>
                        </div>
                        <div class="ml-2 w-full">
                            <div style="height: 25px;">
                                <p>username</p>
                            </div>
                            <div v-if="wantedit === index" class="w-full mt-3" style="height: 100px; overflow: scroll;">
                                <textarea class ="bg-slate-300" v-model="commentedit" style="width: 100%;"></textarea>
                            </div>
                            <div v-else class="w-full mt-3" style="height: 100px; overflow: scroll;">
                                <p>{{ comments.comment }}</p>
                            </div>
                            <div  v-if ="user.user_id === comments.comment_by_id || user.role === 'admin'" class="flex justify-end mr-4">
                                <button class="bg-red-400" style="height: 40px; width: 75px;">Delete</button>
                                <button v-if="wantedit === index" class="bg-yellow-400" style="height: 40px; width: 75px;"
                                    @click="wantedit = -1">cancel</button>
                                <button v-if = "wantedit === index" class="bg-yellow-400" style="height: 40px; width: 75px;"
                                    @click="wantedit = -1; updatecomm()">Confirm</button>
                                <button v-else class="bg-yellow-400" style="height: 40px; width: 75px;"
                                    @click="wantedit = index; commentedit = comments.comment">Edit</button>
                            </div>
                        </div>
                    </div>
                    <!-- <h1 v-for="comment in comments">{{ comment.comment }}</h1> -->
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
            item: {},
            comments: [],
            like: [],
            comment: '',
            wantedit: -1,
            commentedit: '',
            like_of_id:{}
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
        console.log(this.user)
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
        updatecomm(){
            axios
            .put(`http://localhost:3000/${this.$route.params.id}/comments`,{
                comment: this.commentedit
            })
            .then((response) => {
                    this.commentedit.push(response.data);
                })
                .catch((error) => {
                    this.error = error.response.data.message;
                });
        },
        // addlike(){
        //     axios
        //     .post(`http://localhost:3000/like/${this.$route.params.id}`)
        //     .then((response) => {
        //             console.log(response.data);
        //         })
        //         .catch((error) => {
        //             this.error = error.response.data.message;
        //         });
        // },

    }
}
</script>