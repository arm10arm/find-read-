<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user" />
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
