<template>
    <Tabs :tabs="['Hot', 'New']" @change-tab="changeTab"/>
    <div v-if="!loading">
        <AddComment class="mb-1" @add-comment="addPost" :post="true"/>
        <Comment class="mb-1" v-for="post in posts" :key="post.id" :comment="post.content" :tags="post.tagList" />
    </div>
    <Pages class="mb-5 mt-2" :pageCount="pages" @change-page="changePage"/>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import AddComment from '@/components/AddComment.vue';
import Comment from '@/components/Comment.vue';
import Tabs from '@/components/Tabs.vue';
import Pages from '@/components/Pages.vue';
import { useAuthStore } from '@/stores/authStore';

const loading = ref(true)
const posts = ref([])
const pages = ref(0)
const currentPage = ref(0)
const currentTab = ref(0)
const store = useAuthStore()

function addPost(model){
    const request = new FormData()
    request.append('content', model.content)
    request.append('picture', request.file)
    request.append('tags', model.tags)

    console.log(model)

    axios.post('post/addpost', request, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    }).then(res => posts.value.unshift(res.data.data))
        .catch(error => console.log(error))
}

function getHotPosts(){
    loading.value = true
    axios.get('post/hot/' + currentPage.value).then(res => {
        posts.value = res.data
        loading.value = false
    }).then(() => {
        if(store.authorized){
            posts.value.forEach(post => {
                axios.get('reaction/comment/' + post.content.id + '/' + store.userId).then(res => post.content.userReaction = res.data)
            });
        }
        loading.value = false
    })
}

function getNewPosts(){
    loading.value = true
    axios.get('post/new/' + currentPage.value).then(res => {
        posts.value = res.data
        loading.value = false
    }).then(() => {
        if(store.authorized){
            posts.value.forEach(post => {
                axios.get('reaction/comment/' + post.content.id + '/' + store.userId).then(res => post.content.userReaction = res.data)
            });
        }
        loading.value = false
    })
}

function changeTab(index){
    currentTab.value = index

    if(index === 0){
        getHotPosts()
    }
    else if(index === 1){
        getNewPosts()
    }
}

function changePage(page){
    currentPage.value = page - 1
    if(currentTab.value === 0){
        getHotPosts()
    }
    else if(currentTab.value === 1){
        getNewPosts()
    }
}

onMounted(() => {
    axios.get('post/pagecount')
    .then(res => pages.value = res.data)

    getHotPosts()
})

</script>