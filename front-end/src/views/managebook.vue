<script setup>
import navcomp from '../components/navbar.vue'
import axios from "axios";
</script>

<template>
    <div id="app">
        <navcomp></navcomp>
        <h1 class="text-5xl text-center text-black underline underline-offset-8">Manage books</h1><br><br>

        <table class = "w-full text-center border-collapse">
            <thead>
                <th class = "border-4 border-stone-500">Id</th>
                <th class = "border-4 border-stone-500">Name</th>
                <th class = "border-4 border-stone-500">Type</th>
                <th class = "border-4 border-stone-500">Author</th>
                <th class = "border-4 border-stone-500">Img</th>
                <th class = "border-4 border-stone-500">Action</th>
            </thead>
            <tbody>
                <td class="border-4 border-stone-500">1</td>
                <td class="border-4 border-stone-500">asdf</td>
                <td class="border-4 border-stone-500">asdff</td>
                <td class="border-4 border-stone-500">sdfg</td>
                <td class="border-4 border-stone-500">dcbvbfb</td>
                <td class="border-4 border-stone-500">
                    <button>Edit</button>
                    <button class="ml-4">Delete</button>
                </td>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {

}
</script>