<template>
<div>
    <navcomp></navcomp>
    <div class="bg-red-300 w-full flex justify-center items-center" style="height:600px;">
        <div class="h-full bg-slate-400 flex items-center" style="width:400px;">
            <div class="bg-yellow-300 w-full" style="height: 200px;"><br>
                <p class="text-5xl mt-3">Find-read</p><br>
                <p class="text-xl">The more you read the more you get.</p>
                <div v-if="user">
                    <p class="text-xl">Welcome, {{ user.username }}</p>
                    <p>{{ user.role }}</p>
                </div>
            </div>
        </div>
        <div class="h-full bg-slate-400 flex justify-center items-center" style="width:400px; margin-left: 5em;">
            <div>

            </div>
        </div>
    </div>
    <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user" />
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
            })
        },
    }
    }
</script>