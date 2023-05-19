<template>
    <div id="app">
        <div class="flex justify-center items-center h-screen bg-black" id="app">
        <div class="w-96 p-6 shadow-lg bg-white rounded-xl">
            <h1 class="block text-center text-3xl font-semibold">Create an account.</h1>
            <div class="mt-4">
                <label for="username" class=" block text-base mb-2"><b>Username</b></label>
                <input v-model="v$.username.$model" :class="{'border-2 border-rose-500': v$.username.$error}" type="text" id="username" placeholder="Enter your username"
                    class=" border-2 w-full rounded-md py-2 px-3 focus:outline-none focus:ring-0 focus:border-gray-600">
                <template v-if="v$.username.$error">
                    <p class="text-rose-500" v-if="v$.username.$errors[0].$validator == 'required'"><b>Username is required !</b></p>
                    <p class="text-rose-500" v-if="v$.username.$errors[0].$validator == 'minLength'"><b>Username must be at least 8 Characters !</b></p>
                </template>
            </div>
            <div class="mt-4">
                <label for="password" class=" block text-base mb-2"><b>Password</b></label>
                <input v-model="v$.password.$model" :class="{'border-2 border-rose-500': v$.password.$error}" type="password" id="password" placeholder="Enter your password"
                    class=" border-2 w-full rounded-md py-2 px-3 focus:outline-none focus:ring-0 focus:border-gray-600">
                <template v-if="v$.password.$error">
                    <p class="text-rose-500" v-if="v$.password.$errors[0].$validator == 'required'"><b>Password is required !</b></p>
                    <p class="text-rose-500" v-if="v$.password.$errors[0].$validator == 'minLength'"><b>Password must be at least 8 Characters !</b></p>
                    <p class="text-rose-500" v-if="v$.password.$errors[0].$validator == 'safePassword'">
                        <b>Password must contain at least one uppercase letter, one lowercase letter and number !</b></p>
                </template>
            </div>
            <div class="mt-4">
                <label for="confirm_password" class=" block text-base mb-2"><b>Confirm Password</b></label>
                <input v-model="v$.confirm_password.$model" :class="{'border-2 border-rose-500': v$.confirm_password.$error}" type="password" id="confirm_password" placeholder="Confirm your password"
                    class=" border-2 w-full rounded-md py-2 px-3 focus:outline-none focus:ring-0 focus:border-gray-600">
                <template v-if="v$.confirm_password.$error">
                    <p class="text-rose-500" v-if="v$.confirm_password.$errors[0].$validator == 'required'"><b>This field is required !</b></p>
                    <p class="text-rose-500" v-if="v$.confirm_password.$errors[0].$validator == 'sameAs'"><b>Password not match !</b></p>
                </template>
            </div>
            <div class="mt-4">
                <label for="email" class="block text-base mb-2"><b>E-mail</b></label>
                <input v-model="v$.email.$model" :class="{'border-2 border-rose-500': v$.email.$error}" type="email" id="email" placeholder="Enter your E-mail"
                    class=" border-2 w-full rounded-md py-2 px-3 focus:outline-none focus:ring-0 focus:border-gray-600">
                <template v-if="v$.email.$error">
                    <p class="text-rose-500" v-if="v$.email.$errors[0].$validator == 'required'"><b>Email is required !</b></p>
                    <p class="text-rose-500" v-if="v$.email.$errors[0].$validator == 'email'"><b>Invalid email !</b></p>
                </template>
            </div>
            <div class="mt-4">
                <label for="first_name" class="block text-base mb-2"><b>First Name</b></label>
                <input v-model="v$.first_name.$model" :class="{'border-2 border-rose-500': v$.first_name.$error}" type="text" id="first_name" placeholder="Enter your First Name"
                    class=" border-2 w-full rounded-md py-2 px-3 focus:outline-none focus:ring-0 focus:border-gray-600">
                <template v-if="v$.first_name.$error">
                    <p class="text-rose-500" v-if="v$.first_name.$errors[0].$validator == 'required'"><b>This field is required !</b></p>
                    <p class="text-rose-500" v-if="v$.first_name.$errors[0].$validator == 'maxLength'"><b>Invalid First Name !</b></p>
                </template>
            </div>
            <div class="mt-4">
                <label for="last_name" class="block text-base mb-2"><b>Last Name</b></label>
                <input v-model="v$.last_name.$model" :class="{'border-2 border-rose-500': v$.last_name.$error}" type="text" id="last_name" placeholder="Enter your Last Name"
                    class=" border-2 w-full rounded-md py-2 px-3 focus:outline-none focus:ring-0 focus:border-gray-600">
                <template v-if="v$.last_name.$error">
                    <p class="text-rose-500" v-if="v$.last_name.$errors[0].$validator == 'required'"><b>This field is required !</b></p>
                    <p class="text-rose-500" v-if="v$.last_name.$errors[0].$validator == 'maxLength'"><b>Invalid Last Name !</b></p>
                </template>
            </div>
            <div class="mt-4">
                <label for="birth_date" class="block text-base mb-2"><b>Date of Birth</b></label>
                <input v-model="v$.birth_date.$model" :class="{'border-2 border-rose-500': v$.birth_date.$error}" type="text" id="birth_date" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="Enter your Date of Birth"
                    class=" border-2 w-full py-2 px-3 rounded-md focus:outline-none focus:ring-0 focus:border-gray-600">
                <template v-if="v$.birth_date.$error">
                    <p class="text-rose-500" v-if="v$.birth_date.$errors[0].$validator == 'required'"><b>This field is required !</b></p>
                </template>

            </div>
            <div class="mt-5">
                <button class="w-full bg-black text-white rounded-md py-2" @click="submit()">Sign Up</button>
            </div>

        </div>
    </div>
    </div>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required, email, minLength, maxLength, sameAs } from '@vuelidate/validators'
import axios from 'axios'

function safePassword(value) {
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
}
return true;
}

export default {
    data () {
        return {
            v$: useValidate(),
            username: "",
            password: "",
            confirm_password: "",
            email: "",
            first_name: "",
            last_name: "",
            birth_date: ""
        }
    },
    methods: {
        submit () {
            this.v$.$validate()
            if (this.v$.$error) {
                alert("Please fill all the fields correctly !")
            }
            else{
                let data = {
                    username: this.username,
                    password: this.password,
                    confirm_password: this.confirm_password,
                    email: this.email,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    birth_date: this.birth_date
                }

                axios.post("http://localhost:3000/user/signup", data)
                .then((res) => {
                    alert("Sign up Success");
                    this.$router.push({ name: "login" })
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        }
    },
    validations () {
        return {
            username: { required, minLength: minLength(8) },
            password: { required, minLength: minLength(8), safePassword },
            confirm_password: { required, sameAs: sameAs(this.password) },
            email: { required, email },
            first_name: { required, maxLength: maxLength(150) },
            last_name: { required, maxLength: maxLength(150) },
            birth_date: { required }
        }
    },
}

</script>