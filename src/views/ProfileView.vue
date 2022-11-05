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
                    <p class="title">
                        <UserName :username="user.userName" :id="user.id" :rank="user.rank"/>
                        <span class="subtitle ml-2">Joined {{user.created}}</span>
                        <router-link class="button ml-2" to="/profile/update" v-if="id === store.userId">
                            Update
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <Tabs :tabs="['Findings', 'Posts']" @change-tab="changeTab"/>
    <div v-if="tab === 0">
        <Finding class="mt-1" v-for="finding in findings.value" :key="finding.id" :finding="finding"/>
    </div>
    <div v-if="tab === 1">
        <Comment class="mt-1" v-for="post in posts.value" :key="post.content.id" :comment="post.content" :tags="post.tagList"/>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import Finding from '../components/Finding.vue';
import Comment from '@/components/Comment.vue';
import Tabs from '@/components/Tabs.vue';
import UserName from '@/components/UserName.vue';

const loading = ref(true)
const route = useRoute()
const store = useAuthStore()

const id = route.params.id

const user = ref({})

const posts = reactive([])

const findings = reactive([])

const tab = ref(0)

function getFindings(){
    loading.value = true
    axios.get('user/findings/' + id).then(res => {
        findings.value = res.data
        loading.value = false
    })    
}

function getPosts(){
    loading.value = true
    axios.get('user/posts/' + id).then(res => {
        posts.value = res.data
        loading.value = false
    })
}

function changeTab(number){
    if(number === 0){
        getFindings()
    }
    else if(number === 1){
        getPosts()
    }

    tab.value = number
}

onMounted(() => {
    loading.value = true
    axios.get('user/profile/' + id)
    .then(res => {
        user.value = res.data
        getFindings()
    })
})

</script>