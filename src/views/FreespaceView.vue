<template v-if="!loading">
    <AddComment @add-comment="addPost"/>
    <Comment class="mb-1" v-for="post in posts" :key="post.id" :comment="post" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import AddComment from '@/components/AddComment.vue';
import Comment from '@/components/Comment.vue';

const loading = ref(true)
const posts = ref([])

function addPost(model){
    axios.post('comment/addpost', model)
        .then(res => posts.value.push(res.data))
        .catch(error => console.log(error))
}

onMounted(() => {
    axios.get('comment/getposts').then(res => {
        posts.value = res.data
        loading.value = false
    })
})

</script>