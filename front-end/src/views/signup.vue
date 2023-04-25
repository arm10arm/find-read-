<template>
    <div id="app">
        <div class="flex justify-center items-center h-screen bg-black" id="app">
        <div class="w-96 p-6 shadow-lg bg-white rounded-xl">
            <h1 class="block text-center text-3xl font-semibold">Sign Up!</h1>
            <div class="mt-4">
                <label for="username" class=" block text-base mb-2">Username</label>
                <input type="text" id="username" placeholder="Enter your username"
                    class=" border w-full rounded-sm py-2 focus:outline-none focus:ring-0 focus:border-gray-600">
            </div>
            <div class="mt-4">
                <label for="password" class=" block text-base mb-2">Password</label>
                <input type="password" id="password" placeholder="Enter your password"
                    class=" border w-full rounded-sm py-2 focus:outline-none focus:ring-0 focus:border-gray-600">
            </div>
            <div class="mt-4">
                <label for="email" class="block text-base mb-2">E-mail</label>
                <input type="email" id="email" placeholder="Enter your E-mail"
                    class=" border w-full rounded-sm py-2 focus:outline-none focus:ring-0 focus:border-gray-600">
            </div>
            <div class="mt-4">
                <label for="first_name" class="block text-base mb-2">First Name</label>
                <input type="text" id="first_name" placeholder="Enter your First Name"
                    class=" border w-full rounded-sm py-2 focus:outline-none focus:ring-0 focus:border-gray-600">
            </div>
            <div class="mt-4">
                <label for="last_name" class="block text-base mb-2">Last Name</label>
                <input type="text" id="last_name" placeholder="Enter your Last Name"
                    class=" border w-full rounded-sm py-2 focus:outline-none focus:ring-0 focus:border-gray-600">
            </div>
            <div class="mt-4">
                <label for="dob" class="block text-base mb-2">Date of Birth</label>
                <input type="date" id="dob"
                    class=" border w-full rounded-sm focus:outline-none focus:ring-0 focus:border-gray-600">
            </div>
            <div class="mt-5">
                <button class="w-full bg-black text-white rounded-sm py-2">Sign Up</button>
            </div>

        </div>
    </div>
    </div>
</template>