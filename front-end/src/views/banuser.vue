<script setup>
import navcomp from '../components/navbar.vue'
import axios from '@/plugins/axios';
</script>

<template>
    <div id="app">
        <navcomp></navcomp>
        <h1 class="text-5xl text-center text-black underline underline-offset-8 mt-6"><b>Manage Banned Users</b></h1><br><br>
        <div class="flex items-center justify-center">
            <table class="w-3/4 text-center border-collapse">
                <thead>
                    <th class="bg-black text-white text-xl">ID</th>
                    <th class="bg-black text-white text-xl">Username</th>
                    <th class="bg-black text-white text-xl">Name</th>
                    <th class="bg-black text-white text-xl">Email</th>
                    <th class="bg-black text-white text-xl">Action</th>
                </thead>
                <tbody v-for="(item, index) in member" :key="item.id">
                    <td class="bg-slate-400 text-lg"><b>{{ index + 1 }}</b></td>
                    <td class="bg-slate-400 text-lg"><b>{{ item.username }}</b></td>
                    <td class="bg-slate-400 text-lg"><b>{{ item.first_name + " " + item.last_name }}</b></td>
                    <td class="bg-slate-400 text-lg"><b>{{ item.email }}</b></td>
                    <td class="bg-slate-400"><button class="w-24 h-10 rounded-lg bg-rose-500 text-white my-2 mx-2" @click="unBanMember(item.user_id)">Unban</button></td>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            user: null,
            member: [],
        };
    },
    mounted() {
        this.getBannedMember();
    },
    methods: {
        getBannedMember(){
            axios.get('/banmembers').then(res => {
                this.member = res.data.user;
                console.log(res.data.user);
            })
            .catch((err) => {
                console.log(err);
        });
        },
        unBanMember(user_id){
            console.log(user_id);
            axios.put(`/banmembers/${user_id}`).then(res => {
                this.member = res.data.user;
                window.location.reload();
                console.log(res.data.user);
            })
            .catch((err) => {
                console.log(err);
        });
        }
    }
}
</script>