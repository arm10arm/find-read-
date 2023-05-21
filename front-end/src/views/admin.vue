<script setup>
import navcomp from '../components/navbar.vue'
import footcomp from '../components/footer.vue'
import axios from "axios";

</script>

<template>
    <div id="app">
        <navcomp></navcomp><br>
        <h1 class="text-5xl text-center text-black underline underline-offset-8"><b>Admin</b></h1><br><br>
        <div class="grid grid-cols-2 gap-2 place-content-center place-items-center">
            <div><router-link to="/managebooks" class="flex flex-col justify-center items-center p-4 bg-[#D9D9D9]">
                <img class="w-1/2" src="https://cdn-icons-png.flaticon.com/512/2702/2702162.png" alt="">
                <h1 class="text-lg font-bold mt-4 text-center">เพิ่ม/ลบ/แก้ไข<br>หนังสือ</h1>
            </router-link>
            </div>
            <div><router-link to="/user" class="flex flex-col justify-center items-center p-4 bg-[#D9D9D9]">
                <img class="w-1/2" src="https://cdn.discordapp.com/attachments/936538603402706967/1100957842120392832/group-2-512.png" alt="">
                <h1 class="text-lg font-bold mt-4 text-center">ดูสมาชิก</h1>
            </router-link>
            </div>

        <div><router-link to="banuser" class="flex flex-col justify-center items-center p-4 bg-[#D9D9D9]">
                <img class="w-1/2" src="https://cdn.discordapp.com/attachments/936538603402706967/1100958013117968456/709489.png" alt="">
                <h1 class="text-lg font-bold mt-4 text-center">สมาชิกที่ถูกแบน</h1>
            </router-link>
        </div>
        </div><br>
        <footcomp></footcomp>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped></style>