<template v-if="!loading">
    <Tabs :tabs="['Hot', 'New']" @change-tab="changeTab"/>
    <div v-if="!loading">
        <AddComment class="mb-1" @add-comment="addPost"/>
        <Comment class="mb-1" v-for="post in posts" :key="post.id" :comment="post" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import AddComment from '@/components/AddComment.vue';
import Comment from '@/components/Comment.vue';
import Tabs from '@/components/Tabs.vue';

const loading = ref(true)
const posts = ref([])

function addPost(model){
    const request = new FormData()
    request.append('content', model.content)
    request.append('picture', request.file)

    axios.post('post/addpost', request, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    }).then(res => posts.value.push(res.data))
        .catch(error => console.log(error))
}

function getHotPosts(){
    loading.value = true
    axios.get('post/hot').then(res => {
        posts.value = res.data
        loading.value = false
    })
}

function getNewPosts(){
    loading.value = true
    axios.get('post/new').then(res => {
        posts.value = res.data
        loading.value = false
    })
}

function changeTab(index){
    if(index === 0){
        getHotPosts()
    }
    else if(index === 1){
        getNewPosts()
    }
}

onMounted(() => {
    getHotPosts()
})

</script>