<template v-if="!loading">
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-128x128">
                        <img :src="$image('ProfilePicture', id)" :alt="user.userName">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title">{{user.userName}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="tabs is-centered">
        <ul>
            <li :class="{ 'is-active': tab === 0 }"><a @click="changeTab(0)">Findings</a></li>
            <li :class="{ 'is-active': tab === 1 }"><a @click="changeTab(1)">Posts</a></li>
        </ul>
    </div>
    <div v-if="tab === 0">
        <Finding class="mt-1" v-for="finding in findings.value" :key="finding.id" :finding="finding"/>
    </div>
    <div v-if="tab === 1">
        <Comment class="mt-1" v-for="post in posts.value" :key="post.id" :comment="post"/>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Finding from '../components/Finding.vue';
import Comment from '@/components/Comment.vue';

const loading = ref(true)
const route = useRoute()

const id = route.params.id

const user = ref({})

const posts = reactive([])

const findings = reactive([])

const tab = ref(0)

function changeTab(number){
    if(number === 0){
        axios.get('user/findings/' + id).then(res => {
            findings.value = res.data
            tab.value = number
        })
    }
    else if(number === 1){
        axios.get('user/posts/' + id).then(res => {
            posts.value = res.data
            tab.value = number
        })
    }
}

onMounted(() => {
    axios.get('user/profile/' + id)
    .then(res => {
        user.value = res.data
        loading.value = false
        axios.get('user/findings/' + id).then(res => {
            findings.value = res.data
            tab.value = 0
        })
    })
})

</script>