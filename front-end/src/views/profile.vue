<template>
    <div id="app">
        <navcomp></navcomp>
        <div v-if="user" class="flex flex-row">
            <div class="w-1/4 bg-slate-700 h-screen">
                <div class="flex justify-center items-center" style="width:100%; height: 200px;">
                    <!-- profile image -->
                    <img class="rounded-md w-auto h-auto mx-20 mt-8 " :src=" file ? `http://localhost:3000/uploads/${file}`: src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'" style="width:200px; height: 150px;">
                </div>
                <div>
                    <!-- profile name -->
                    <h1 class="text-3xl text-center text-white mt-4"><b>{{ user.first_name + " " + user.last_name }}</b></h1>
                    <h1 class="text-xl text-left text-white mx-8 mt-24"><b>Username: {{ user.username }}</b></h1>
                    <h1 class="text-xl text-left text-white mx-8 mt-4"><b>Email: {{ user.email }}</b></h1>
                    <h1 v-if="user.role == 'admin'" class="text-xl text-left text-white mx-8 mt-4"><b>Welcome {{ user.role }} !</b></h1>
                </div>
            </div>
            <div class="w-full bg-grey-lightest" style="padding-top: 4rem;">
                <div class="container mx-auto py-8">
                    <div class="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
                        <div class="py-4 px-8 text-black text-xl border-b border-grey-lighter"><b>Update Profile</b></div>
                        <div class="py-4 px-8">
                            <div class="mb-4">
                                <label class="block text-grey-darker text-sm font-bold mb-2" for="username">Username</label>
                                <input v-model="v$.username.$model" :class="{'border-2 border-rose-500': v$.username.$error}" class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="New Username">
                            </div>
                            <template v-if="v$.username.$error">
                                <p class="text-rose-500" v-if="v$.username.$errors[0].$validator == 'required'"><b>Username is required !</b></p>
                                <p class="text-rose-500" v-if="v$.username.$errors[0].$validator == 'minLength'"><b>Username must be at least 8 Characters !</b></p>
                            </template>
                            <div class="flex mb-4">
                                <div class="w-1/2 mr-1">
                                    <label class="block text-grey-darker text-sm font-bold mb-2" for="first_name">First Name</label>
                                    <input v-model="v$.first_name.$model" :class="{'border-2 border-rose-500': v$.first_name.$error}" class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="first_name" type="text" placeholder="New First Name">
                                </div>
                                <div class="w-1/2 ml-1">
                                    <label class="block text-grey-darker text-sm font-bold mb-2" for="last_name">Last Name</label>
                                    <input v-model="v$.last_name.$model" :class="{'border-2 border-rose-500': v$.last_name.$error}" class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="last_name" type="text" placeholder="New Last Name">
                                </div>
                            </div>
                            <template v-if="v$.first_name.$error">
                                <p class="text-rose-500" v-if="v$.first_name.$errors[0].$validator == 'required'"><b>First Name field is required !</b></p>
                                <p class="text-rose-500" v-if="v$.first_name.$errors[0].$validator == 'maxLength'"><b>Invalid First Name !</b></p>
                            </template>
                            <template v-if="v$.last_name.$error">
                                <p class="text-rose-500" v-if="v$.last_name.$errors[0].$validator == 'required'"><b>Last Name field is required !</b></p>
                                <p class="text-rose-500" v-if="v$.last_name.$errors[0].$validator == 'maxLength'"><b>Invalid Last Name !</b></p>
                            </template>
                            <div class="mb-4">
                                <label class="block text-grey-darker text-sm font-bold mb-2" for="email">Email Address</label>
                                <input v-model="v$.email.$model" :class="{'border-2 border-rose-500': v$.email.$error}" class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="email" placeholder="New Email Address">
                                <template v-if="v$.email.$error">
                                    <p class="text-rose-500" v-if="v$.email.$errors[0].$validator == 'required'"><b>Email is required !</b></p>
                                    <p class="text-rose-500" v-if="v$.email.$errors[0].$validator == 'email'"><b>Invalid email !</b></p>
                                </template>
                            </div>
                            <div class="mb-4">
                                <label class="block text-grey-darker text-sm font-bold mb-2" for="user_pic">User Profile Picture</label>
                                <input class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="file" ref="file" accept="image/png, image/jpeg, image/webp" @change="handleFileUpload()">
                            </div>
                            <div class="flex items-center justify-between mt-8">
                                <button class="bg-black text-white font-bold py-2 px-4 rounded-md" type="submit" @click="updateUser(user.user_id)">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navcomp from '../components/navbar.vue'
import axios from '@/plugins/axios'
import useValidate from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'

export default {
    components: {
        navcomp
    },
    data() {
        return {
            v$: useValidate(),
            user: null,
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            user_id: '',
            file: null
        }
    },
    mounted () {
        this.onAuthChange()
    },
    methods: {
        onAuthChange () {
            const token = localStorage.getItem('token')
            if (token) {
                this.getUser()
            }
        },
        getUser () {
            axios.get('/user/me').then(res => {
                this.user = res.data
                localStorage.setItem('role', JSON.stringify(res.data.role))
                this.username = res.data.username
                this.first_name = res.data.first_name
                this.last_name = res.data.last_name
                this.email = res.data.email
                this.user_id = res.data.id
                this.file = res.data.user_pic
            })
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
            console.log(this.file);
        },
        updateUser(user_id){
            let updateData = {}
            this.v$.$validate()
            if (this.v$.$error) {
                alert("Please fill all the fields correctly !")
            }
            else{
                if (this.file){
                    console.log(this.file);
                    updateData = {
                    username: this.username,
                    email: this.email,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    user_pic: this.file
                    }
                }
                else{
                    updateData = {
                    username: this.username,
                    email: this.email,
                    first_name: this.first_name,
                    last_name: this.last_name
                    }
                }
                axios.put(`/user/update/${user_id}`, updateData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(res => {
                    alert("Profile updated successfully !")
                    this.user = res.data.user;
                    window.location.reload();
                    console.log(updateData);
                })
            }
        }
    },
    validations () {
        return {
            username: { required, minLength: minLength(8) },
            email: { required, email },
            first_name: { required, maxLength: maxLength(150) },
            last_name: { required, maxLength: maxLength(150) }
        }
    },
}
</script>