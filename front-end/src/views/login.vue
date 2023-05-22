<template>
    <div id="app">
        <div class="flex justify-center items-center h-screen bg-black" id="app">
        <div class="w-96 p-6 shadow-lg bg-white rounded-xl">
            <h1 class="block text-center text-3xl font-semibold"><i class="fa-regular fa-user"></i> Log In</h1>
            <div class="mt-4">
                <label for="username" class=" block text-base mb-2">Username</label>
                <input type="text" v-model="username" id="username" placeholder="Enter your username"
                    class=" border w-full rounded-sm py-2 px-3 focus:outline-none focus:ring-0 focus:border-gray-600">
            </div>
            <div class="mt-4">
                <label for="password" class=" block text-base mb-2">Password</label>
                <input type="password" v-model="password" id="password" placeholder="Enter your password"
                    class=" border w-full rounded-sm py-2 px-3 focus:outline-none focus:ring-0 focus:border-gray-600">
            </div>
            <div v-if="error">
                <p class="text-red-500 mt-2"><b>{{ error }}</b></p>
            </div>
            <div class="flex justify-between items-center mt-3">
                <div>
                    <input type="checkbox">
                    <label> Remember Me?</label>
                </div>
                <div>
                    <a href="#" class="text-black font-semibold">Forgot Password?</a>
                </div>
            </div>

            <div class="mt-5">
                <button class="w-full bg-black text-white rounded-sm py-2" @click="submit()">Log In</button>
                <router-link to = "/signup"><span class="w-full text-black rounded-sm py-2 mt-5">Sign Up</span></router-link>
            </div>

        </div>
    </div>
    </div>
</template>

<script>
import axios from '@/plugins/axios';

export default {
    data () {
        return {
        username: '',
        password: '',
        error: ''
    }
    },
    methods: {
        submit () {
            const data = {
            username: this.username,
            password: this.password
    }

    axios.post('http://localhost:3000/user/login/', data)
    .then(res => {
        alert('Login Success')
        const token = res.data.token
        localStorage.setItem('token', token)
        this.$emit('auth-change')
        this.$router.push({path: 'home'})
    })
    .catch(error => {
        this.error = error.response.data
        console.log(error.response.data)
    })
}
}
}
</script>