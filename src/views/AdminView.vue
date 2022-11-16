<template>
    <Tabs :tabs="['All users', 'Moderators']" @change-tab="changeTab"/>
    <table class="table">
        <UserAdminTableItem v-for="user in users" :key="user.id" :user="user"/>
    </table>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import UserAdminTableItem from '@/components/UserAdminTableItem.vue';
import Tabs from '@/components/Tabs.vue';

const authStore = useAuthStore()
const router = useRouter()

const tab = ref(0)

if(!authStore.isAdmin){
    router.push('/')
}

const users = ref([])

onMounted(() => {
    axios.get('User/users').then(res => users.value = res.data)
})

function changeTab(number){
    tab.value = number

    if(tab.value === 0){
        axios.get('User/users').then(res => users.value = res.data)
    }
    else if(tab.value === 1){
        axios.get('Role/Users/Moderator').then(res => users.value = res.data)
    }
}

</script>