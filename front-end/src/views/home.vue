<script setup>
import navcomp from '../components/navbar.vue'
import axios from "axios";
</script>

<template>
    <navcomp></navcomp>
    <div class="bg-red-300 w-full flex justify-center items-center" style="height:600px;">
        <div class="h-full bg-slate-400 flex items-center" style="width:400px;">
            <div class="bg-yellow-300 w-full" style="height: 200px;"><br>
                <p class="text-5xl mt-3">Find-read</p><br>
                <p class="text-xl">
                    The more you read the more you get.</p>
            </div>
        </div>
        <div class="h-full bg-slate-400 flex justify-center items-center" style="width:400px; margin-left: 5em;">
            <div>

            </div>
        </div>
    </div>
</template>

<style></style>