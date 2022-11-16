<template>
    <Tabs :tabs="['Post', 'Finding']" @change-tab="changeTab"/>
    <table class="table" v-if="!loading" >
        <thead>
            <tr>
                <th>Id</th>
                <th>Reporting User</th>
                <th>Object Id</th>
                <th>Created</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="report in reports" :key="report.id">
                <td><router-link :to="`/report/${type}/${report.id}`">{{report.id}}</router-link></td>
                <td><UserName :id="report.reportingUser.id" :rank="report.reportingUser.rank" :username="report.reportingUser.username"/></td>
                <td>{{report.objectId}}</td>
                <td>{{report.created}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import UserName from '@/components/UserName.vue';
import Tabs from '@/components/Tabs.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const loading = ref(true)
const reports = ref([])
const type = ref('post')
const router = useRouter()
const authStore = useAuthStore()

if(!authStore.isModerator && !authStore.isAdmin){
    router.push('/')
}

function getPost(){
    loading.value = true
    axios.get('report/post', {params: { pageIndex: 0, pageSize: 10 }})
        .then(res => reports.value = res.data)
        .catch(error => console.log(error))
        .then(() => loading.value = false)
}

function getFinding(){
    loading.value = true
    axios.get('report/finding', {params: { pageIndex: 0, pageSize: 10 }})
        .then(res => reports.value = res.data)
        .catch(error => console.log(error))
        .then(() => loading.value = false)
}

function changeTab(num){
    if(num === 0){
        getPost()
        type.value = 'post'
    }
    else if(num === 1){
        getFinding()
        type.value = 'finding'
    }
}

getPost()

</script>