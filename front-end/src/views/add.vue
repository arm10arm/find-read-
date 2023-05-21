<script setup>
import navcomp from '../components/navbar.vue'
import footcomp from '../components/footer.vue'
import axios from "axios";
</script>

<template>
    <div id='app'>
        <navcomp></navcomp>
        <h1 class="text-5xl text-center text-black underline underline-offset-8">Addbook</h1><br><br>
       
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