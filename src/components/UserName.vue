<template>
    <router-link :to="`/profile/${id}`" :class="getColor()">@{{username}}</router-link>
</template>

<script setup>
import { defineProps } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    id: String,
    username: String,
    rank: Number
})

function getColor(){
    if(props.rank === 1){
        return 'orange'
    }
    
    if(props.rank === 2){
        return 'red'
    }

    if(props.rank === 10){
        return 'moderator'
    }

    if(props.rank === 100){
        return 'admin'
    }

    return 'green'
}
</script>

<style scoped>
    .green{
        color: greenyellow;
    }
    .orange{
        color: orange;
    }
    .red{
        color: red;
    }
    .admin{
        color: aliceblue
    }
    .moderator{
        color: purple
    }
</style>