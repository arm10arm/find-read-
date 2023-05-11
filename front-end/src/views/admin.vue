<script setup>
import navcomp from '../components/navbar.vue'
import axios from "axios";

</script>

<template>
    <div id="app">
        <navcomp></navcomp><br>
        <h1 class="text-5xl text-center text-black underline underline-offset-8">Admin</h1><br><br>
        <div class="grid grid-cols-2 gap-4 place-content-center place-items-center">
            <router-link to="" class="flex flex-col justify-center items-center p-4 bg-[#D9D9D9]">
                <img class="w-1/2" src="https://cdn-icons-png.flaticon.com/512/2702/2702162.png" alt="">
                <h1 class="text-lg font-bold mt-4 text-center">เพิ่ม/ลบ/แก้ไข<br>หนังสือ</h1>
            </router-link>

            <router-link to="" class="flex flex-col justify-center items-center p-4 bg-[#D9D9D9]">
                <img class="w-1/2" src="https://cdn.discordapp.com/attachments/936538603402706967/1100957629490151435/126473.png" alt="">
                <h1 class="text-lg font-bold mt-4 text-center">ดูสถิติ ยอดไลค์<br>แต่ละเล่ม</h1>
            </router-link>

            <router-link to="" class="flex flex-col justify-center items-center p-4 bg-[#D9D9D9]">
                <img class="w-1/2" src="https://cdn.discordapp.com/attachments/936538603402706967/1100957842120392832/group-2-512.png" alt="">
                <h1 class="text-lg font-bold mt-4 text-center">ดูสมาชิก</h1>
            </router-link>

            <router-link to="" class="flex flex-col justify-center items-center p-4 bg-[#D9D9D9]">
                <img class="w-1/2" src="https://cdn.discordapp.com/attachments/936538603402706967/1100958013117968456/709489.png" alt="">
                <h1 class="text-lg font-bold mt-4 text-center">สมาชิกที่ถูกแบน</h1>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped></style>