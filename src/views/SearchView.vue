<template>
    
  <Tabs :tabs="['Findings', 'Posts']" @change-tab="changeTab"/>
    <div class="columns">
        <div class="column is-11">
            <input class="input" v-model="search.text" placeholder="Search text"/>
        </div>
        <div class="column is-1">
            <button class="button is-success" @click="searchTab"> Search </button>
        </div>
    </div>
    <label v-if="tab === 0" class="checkbox">
        <input type="checkbox" v-model="search.searchTitle">
        Search title
    </label>
    <label class="checkbox">
        <input type="checkbox" v-model="search.searchCreator">
        Search creator
    </label>
    <label class="checkbox">
        <input type="checkbox" v-model="search.searchTag">
        Search tag
    </label>
    <div v-if="tab === 0">
        <Finding v-for="finding in result" :key="finding.id" :finding="finding"/>
    </div>
    <div v-else>
        <Comment v-for="post in result" :key="post.content.id" :comment="post.content" :tags="post.tagList"/>
    </div>
</template>

<script setup>
import Comment from '@/components/Comment.vue';
import Finding from '@/components/Finding.vue';
import Tabs from '@/components/Tabs.vue'
import axios from 'axios';
import { reactive, ref } from 'vue';

const tab = ref(0)
const search = reactive({
    text: '',
    searchTitle: null,
    searchCreator: null,
    searchTag: null,
    pageSize: 7,
    pageIndex: 0
})

const result = ref({})

function changeTab(number){
    tab.value = number
    search.searchTitle = null
    result.value = {}
}

function searchTab(){
    if(tab.value === 0){
        searchFindings()
    }
    else{
        searchPosts()
    }
}

function searchFindings(){
    axios.get('finding/search', { params: search })
        .then(res => result.value = res.data)
        .catch(error => console.log(error))
}

function searchPosts(){
    axios.get('post/search', { params: search })
        .then(res => result.value = res.data)
        .catch(error => console.log(error))
}

</script>

<style scoped>
.checkbox{
    padding: 5px;
}
</style>