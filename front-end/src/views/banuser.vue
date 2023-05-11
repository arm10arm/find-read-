<script setup>
import navcomp from '../components/navbar.vue'
import axios from "axios";
</script>

<template>
    <div id="app">
        <navcomp></navcomp>
        <h1 class="text-5xl text-center text-black underline underline-offset-8">Manage books</h1><br><br>

        <table class="w-full text-center border-collapse">
            <thead>
                <th class="border-4 border-stone-500">Id</th>
                <th class="border-4 border-stone-500">Username</th>
                <th class="border-4 border-stone-500">Firstname</th>
                <th class="border-4 border-stone-500">Lastname</th>
                <th class="border-4 border-stone-500">Phone</th>
                <th class="border-4 border-stone-500">Action</th>
            </thead>
            <tbody>
                <td class="border-4 border-stone-500">1</td>
                <td class="border-4 border-stone-500">asdf</td>
                <td class="border-4 border-stone-500">asdff</td>
                <td class="border-4 border-stone-500">sdfg</td>
                <td class="border-4 border-stone-500">00000000</td>
                <td class="border-4 border-stone-500"><button>unban</button></td>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {

}
</script>