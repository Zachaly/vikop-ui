<template>
    <div v-if="!loading">
        <p class="title">Reason: {{report.reason}}</p>
        <p class="subtitle">Created: {{report.created}}</p>
        <Comment v-if="type == 'post'" :postId="report.post.id" :comment="report.post.content" :tags="report.post.tags"/>
        <Finding v-if="type == 'finding'" :finding="report.finding"/>
    </div>
    <div>
        <button class="button m-1 is-warning" @click="accept">Accept</button>
        <button class="button m-1 is-danger" @click="reject">Reject</button>
    </div>
</template>

<script setup>
import Comment from '@/components/Comment.vue';
import Finding from '@/components/Finding.vue';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const report = ref({})
const route = useRoute()
const id = route.params.id
const type = route.params.type
const loading = ref(true)
const router = useRouter()
const authStore = useAuthStore()

if(!authStore.isAdmin && !authStore.isModerator){
    router.push('/')
}

axios.get('report/' + type + '/' + id)
    .then(res => report.value = res.data)
    .then(() => loading.value = false)

function accept(){
    axios.delete(`report/${type}/`, { data: { reportId: id, accepted: true} })
        .then(() => router.push('/moderation'))
        .catch(error => console.log(error))
}

function reject(){
    axios.delete(`report/${type}/`, { data: { reportId: id, accepted: false} })
        .then(() => router.push('/moderation'))
        .catch(error => console.log(error))
}

</script>