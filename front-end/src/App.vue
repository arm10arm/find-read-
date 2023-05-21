<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="this.user" />
</template>


<script>
import axios from '@/plugins/axios'

export default {
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
