<script setup>
import navcomp from '../components/navbar.vue'
import footcomp from '../components/footer.vue'
import axios from 'axios';
</script>

<template>
    <div id = "app">
        <navcomp></navcomp>
        <h1 class="text-5xl text-center text-black underline underline-offset-8">Edit book</h1><br><br>
        <div class="flex justify-center items-center" style="width: 100%; height: 500px;">
            <form>
                <div>
                    <label>ชื่อหนังสือ:</label>
                    <input type="text" name="book_name" class="border-zinc-700 border-2" v-model="v$.name.$model">
                    <template v-if="v$.name.$error">
                        <p class="text-rose-500 mt-0" v-if="v$.name.$errors[0].$validator == 'required'"><b>bookname is
                                required !</b></p>
                        <p class="text-rose-500 mt-0" v-if="v$.name.$errors[0].$validator == 'maxLength'"><b>too much
                                alpha</b></p>
                    </template>
                </div>
                <div class="mt-5">
                    <label>ชนิดหนังสือ:</label>
                    <select name="book_type" class="border-zinc-700 border-2" v-model="v$.type.$model">
                        <option selected></option>
                        <option value="howto">พัฒนาตัวเอง</option>
                        <option value="literature">วรรณกรรม</option>
                        <option value="business">ธุรกิจ</option>
                        <option value="garden">การจัดสวน</option>
                        <option value="novel">นวนิยาย</option>
                    </select>
                    <template v-if="v$.type.$error" class="mt-0">
                        <p class="text-rose-500 mt-0" v-if="v$.type.$errors[0].$validator == 'required'"><b>typebook is
                                required !</b></p>
                    </template>
                </div>
                <div class="mt-5">
                    <label>สํานักพิมพ์:</label>
                    <input type="text" name="publisher" class="border-zinc-700 border-2" v-model="v$.publisher.$model">
                    <template v-if="v$.publisher.$error">
                        <p class="text-rose-500 mt-0" v-if="v$.publisher.$errors[0].$validator == 'required'"><b>publisher
                                is
                                required !</b></p>
                        <p class="text-rose-500 mt-0" v-if="v$.publisher.$errors[0].$validator == 'maxLength'"><b>too much
                                alpha</b></p>
                    </template>
                </div>
                <div class="mt-5">
                    <label>ผู้เขียน:</label>
                    <input type="text" name="book_author" class="border-zinc-700 border-2" v-model="v$.author.$model">
                    <template v-if="v$.author.$error">
                        <p class="text-rose-500 mt-0" v-if="v$.author.$errors[0].$validator == 'required'"><b>author is
                                required !</b></p>
                        <p class="text-rose-500 mt-0" v-if="v$.author.$errors[0].$validator == 'maxLength'"><b>too much
                                alpha</b></p>
                    </template>
                </div>
                <div class="mt-5">
                    <label>เนื้อหา:</label>
                    <textarea cols="30" rows="10" name="content" class="border-zinc-700 border-2"
                        v-model="v$.content.$model"></textarea>
                    <template v-if="v$.content.$error">
                        <p class="text-rose-500 mt-0" v-if="v$.content.$errors[0].$validator == 'required'"><b>content is
                                required !</b></p>
                        <p class="text-rose-500 mt-0" v-if="v$.content.$errors[0].$validator == 'maxLength'"><b>too much
                                alpha</b></p>
                    </template>
                </div>
                <div class="mt-5">
                    <button type="submit" @click="submit()">submit</button>
                </div>
            </form>
        </div><br>
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
            publisher: ''
        }
    },
    created() {
        axios.get(`http://localhost:3000/book/${this.$route.params.id}`)
            .then((response) => {
                this.name = response.data.book[0].book_name;
                this.type = response.data.book[0].book_type;
                this.author = response.data.book[0].author;
                this.publisher = response.data.book[0].publisher;
                this.content = response.data.book[0].contents;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        handleFileUpload() {
            console.log('In')
            this.file = this.$refs.file.files[0];
        },
        submit(){
            console.log('sadsad');
            this.v$.$validate()
            if (this.v$.$error) {
                alert("Please fill all the fields correctly !")
            }
            else{
                let updateData = {
                   book_name: this.name,
                   book_type: this.type,
                   book_author: this.author,
                   content: this.content,
                   publisher: this.publisher
                }
                console.log('sadsad yaya');
                axios.put(`/books/${this.$route.params.id}`, updateData).then(res => {
                    console.log(res);
                    alert("book updated successfully !")
                    // window.location.reload();
                }).catch((err) => {
                console.log(err);
            });
            }
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
