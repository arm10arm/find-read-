<script setup>
import navcomp from '../components/navbar.vue'
import footcomp from '../components/footer.vue'
import axios from "axios";
</script>

<template>
    <div id='app'>
        <navcomp></navcomp>
        <h1 class="text-5xl text-center text-black underline underline-offset-8">Addbook</h1><br><br>
        <div class="flex justify-center items-center" style="width: 100%; height: 700px; background-color: bisque;">
            <form>
                <label>ชื่อหนังสือ:</label>
                <input type="text" name="book_name" class="border-zinc-700 border-2" v-model="name"><br><br>
                <label>ชนิดหนังสือ:</label>
                <select name="book_type" class="border-zinc-700 border-2" v-model="type">
                    <option selected></option>
                    <option value="howto">พัฒนาตัวเอง</option>
                    <option value="literature">วรรณกรรม</option>
                    <option value="business">ธุรกิจ</option>
                    <option value="garden">การจัดสวน</option>
                    <option value="novel">นวนิยาย</option>
                </select><br><br>
                <label>สํานักพิมพ์:</label>
                <input type="text" name="publisher" class="border-zinc-700 border-2" v-model="publisher"><br><br>
                <label>ผู้เขียน:</label>
                <input type="text" name="book_author" class="border-zinc-700 border-2" v-model="author"><br><br>
                <label>เนื้อหา:</label>
                <textarea cols="30" rows="10" name="content" class="border-zinc-700 border-2"
                    v-model="content"></textarea><br><br>
                <label>รูป:</label>
                <input type="file" id="file" ref="file" @change="handleFileUpload()">
                <button type="submit" @click="submit()">submit</button>
            </form>
        </div>
        <footcomp></footcomp>
    </div>
</template>



<script>
export default {
    data() {
        return {
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
            var formData = new FormData();
            formData.append("book_name", this.name);
            formData.append("book_type", this.type)
            formData.append("book_author", this.author)
            formData.append("content", this.content)
            formData.append("publisher", this.publisher)
            formData.append("book_image", this.file)
            axios.post('http://localhost:3000/books', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response);
                this.$router.push({ path: '/categories' }) // Success! -> redirect to home page
            })
                .catch(error => {
                    console.log(error.message);
                });
        }
    }
}
</script>