<template>
    <div id="app">
        <navcomp></navcomp>
        <div v-if="user" class="flex flex-row">
            <div class="w-1/4 bg-slate-700 h-screen">
                <div class="md:w-3/12 md:ml-16">
                    <!-- profile image -->
                    <img class="rounded-md w-auto h-auto mx-20 mt-8 " src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile image">
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
                                <input class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="New Username">
                            </div>
                            <div class="flex mb-4">
                                <div class="w-1/2 mr-1">
                                    <label class="block text-grey-darker text-sm font-bold mb-2" for="first_name">First Name</label>
                                    <input class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="first_name" type="text" placeholder="New First Name">
                                </div>
                                <div class="w-1/2 ml-1">
                                    <label class="block text-grey-darker text-sm font-bold mb-2" for="last_name">Last Name</label>
                                    <input class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="last_name" type="text" placeholder="New Last Name">
                                </div>
                            </div>
                            <div class="mb-4">
                                <label class="block text-grey-darker text-sm font-bold mb-2" for="email">Email Address</label>
                                <input class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="email" placeholder="New Email Address">
                            </div>
                            <div class="flex items-center justify-between mt-8">
                                <button class="bg-black text-white font-bold py-2 px-4 rounded-md" type="submit">
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

export default {
    name: 'Home',
    components: {
        navcomp
    },
    data() {
        return {
            user: null
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
            })
        },
    }
    }
</script>