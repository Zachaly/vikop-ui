<template>
    <div v-if="!loading">
        <Finding :finding="finding.value.finding"/>
        <section class="section">
            <p class="title is-4">Comments ({{finding.value.comments.length}})</p>
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
    const request = new FormData()
    request.append('content', commentModel.content)
    request.append('findingId', id)
    request.append('picture', commentModel.file)

    axios.post('comment/addfindingcomment', request, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    }).then(res => finding.value.comments.push(res.data))
}

onMounted(() => {
    loading.value = true
    axios.get('finding/get/' + id)
    .then(res => {
        finding.value = res.data
        
    }).then(() => {
        if(store.authorized){
            axios.get('reaction/finding/' + id + '/' + store.userId)
            .then(res => finding.value.finding.userReaction = res.data)
            finding.value.comments.forEach(comment => {
                axios.get('reaction/comment/' + comment.id + '/' + store.userId).then(res => comment.userReaction = res.data)
            });
        }
        loading.value = false
    })
    .catch(error => console.log(error))
})
</script>
