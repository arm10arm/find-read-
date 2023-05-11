<script setup>
import navcomp from '../components/navbar.vue'
import axios from "axios";
</script>

<template>
    <div id='app'>
        <navcomp></navcomp>
        <div class="flex justify-center items-center" style="width: 100%; height: 700px; background-color: bisque;">
            <form>
                <label>ชื่อหนังสือ:</label>
                <input type="text" name="book_name" class="border-zinc-700 border-2" v-model="name"><br><br>
                <label>ชนิดหนังสือ:</label>
                <select name="book_type" class="border-zinc-700 border-2" v-model="type">
                    <option value="howto">พัฒนาตัวเอง</option>
                    <option value = "literature">วรรณกรรม</option>
                    <option value = "business">ธุรกิจ</option>
                    <option value= "garden">การจัดสวน</option>
                    <option value= "novel">นวนิยาย</option>
                </select><br><br>
                <label>สํานักพิมพ์:</label>
                <input type="text" name="publisher" class="border-zinc-700 border-2" v-model="publisher"><br><br>
                <label>ผู้เขียน:</label>
                <input type="text" name="book_author" class="border-zinc-700 border-2" v-model="author"><br><br>
                <label>เนื้อหา:</label>
                <textarea cols="30" rows="10" name="content" class="border-zinc-700 border-2"
                    v-model="content"></textarea><br><br>
                <label>รูป:</label>
                <input type="file" id="file" ref="file" @change="handleFileUpload()">
                <button type="submit" @click="submit()">submit</button>
            </form>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped></style>