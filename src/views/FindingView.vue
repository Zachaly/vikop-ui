<template>
    <div v-if="!loading">
        <Finding :finding="finding.value"/>
        <section class="section">
            <p class="title">Comments</p>
            <Comment class="mt-1" v-for="comment in finding.value.comments" :key="comment.id" :comment="comment" :subcomment="false"/>
            <AddComment class="mt-1" @add-comment="addComment"/>
        </section>
    </div>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import Finding from '@/components/Finding.vue';
import Comment from '@/components/Comment.vue';
import AddComment from '@/components/AddComment.vue';

const loading = ref(true)
const route = useRoute()

const store = useAuthStore()

const id = route.params.id

const finding = reactive({})

function addComment(commentModel){
    const request = {
        findingId: finding.value.id,
        content: commentModel.content
    }
    axios.post('comment/addfindingcomment', request)
    .then(res => finding.value.comments.push(res.data))
}

onMounted(() => {
    loading.value = true
    axios.get('finding/get/' + id)
    .then(res => {
        finding.value = res.data
        loading.value = false
    }).then(() => {
        if(store.authorized){
            finding.value.comments.forEach(comment => {
                axios.get('comment/currentuserreaction/' + comment.id).then(res => comment.userReaction = res.data)
            });
        }
    })
    .catch(error => console.log(error))
})
</script>
