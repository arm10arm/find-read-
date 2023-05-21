<script setup>
import navcomp from '../components/navbar.vue'
import footcomp from '../components/footer.vue'
import axios from "axios";
</script>

<template>
    <div id='app'>
        <navcomp></navcomp>
        <h1 class="text-5xl text-center text-black underline underline-offset-8 py-8">Addbook</h1>
        <div class="w-full bg-grey-lightest" style="padding-top: 4rem;">
            <div class="container mx-auto py-8">
                <div class="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
                    <div class="py-4 px-8 text-black text-xl border-b border-grey-lighter"><b>Book Info</b></div>
                    <div class="py-4 px-8">
                        <div class="mb-4">
                            <label class="block text-grey-darker text-sm font-bold mb-2" for="book_name">Book Name</label>
                            <input class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="book_name" type="text" placeholder="Insert book name here.">
                        </div>
                        <div class="mb-4">
                            <label class="block text-grey-darker text-sm font-bold mb-2" for="book_type">Book Type</label>
                            <input class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="book_type" type="text" placeholder="Insert book name here.">
                        </div>
                        <div class="mb-4">
                            <label class="block text-grey-darker text-sm font-bold mb-2" for="author">Book Author</label>
                            <input class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="author" type="text" placeholder="Insert book author here.">
                        </div>
                        <div class="mb-4">
                            <label class="block text-grey-darker text-sm font-bold mb-2" for="publisher">Publisher</label>
                            <input class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="publisher" type="text" placeholder="Insert publisher here.">
                        </div>
                        <div class="mb-4">
                            <label class="block text-grey-darker text-sm font-bold mb-2" for="content">Content</label>
                            <textarea class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="content" type="text" placeholder="Insert content here."></textarea>
                        </div>
                        <div class="flex items-center justify-between mt-8">
                            <button class="bg-black text-white font-bold py-2 px-4 rounded-md" type="submit">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footcomp></footcomp>
    </div>
</template>



<script>
import useValidate from '@vuelidate/core'
import { required, maxLength, minLength } from '@vuelidate/validators'

export default {
    data() {
        return {
            v$: useValidate(),
            name: '',
            type: '',
            author: '',
            content: '',
            publisher: '',
            file: null
        }
    },
    methods: {
        handleFileUpload() {
            console.log('In')
            this.file = this.$refs.file.files[0];
        },
        submit() {
            this.v$.$validate()
            if (this.v$.$error) {
                alert("Please fill all the fields correctly !")
            }
            var formData = new FormData();
            formData.append("name", this.name);
            formData.append("type", this.type)
            formData.append("author", this.author)
            formData.append("content", this.content)
            formData.append("publisher", this.publisher)
            formData.append("book_image", this.file)
            axios.post('http://localhost:3000/books', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response);
                // this.$router.push({ path: '/categories' }) // Success! -> redirect to home page
            })
                .catch(error => {
                    console.log(error.message);
                });
        }
    },
    validations() {
        return {
            name: { required, maxLength: maxLength(150) },
            type: { required, minLength: minLength(1) },
            author: { required, maxLength: maxLength(80) },
            content: { required, maxLength: maxLength(255) },
            publisher: { required, maxLength: maxLength(80) }
        }
    },
}
</script>