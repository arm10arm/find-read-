<script setup>
import navcomp from '../components/navbar.vue'
</script>

<template>
    <div id = 'app'>
        <navcomp></navcomp>
        <div class="flex justify-center items-center" style="width: 100%; height: 700px; background-color: bisque;">
            <form action="">
                <label>ชื่อหนังสือ:</label>
                <input type="text" class = "border-zinc-700 border-2"><br><br>
                <label>ชนิดหนังสือ:</label>
                <input type="text" class = "border-zinc-700 border-2"><br><br>
                <label>ผู้เขียน:</label>
                <input type="text" class = "border-zinc-700 border-2"><br><br>
                <label>เนื้อหา:</label>
                <textarea cols="30" rows="10"  class = "border-zinc-700 border-2"></textarea><br><br>
                <label>รูป:</label>
                <input type="file">
            </form>
        </div>
    </div>
</template>

