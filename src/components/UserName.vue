<template>
    <router-link :to="`/profile/${id}`" class="username">@{{username}}</router-link>
</template>

<script setup>
import { defineProps } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    id: String,
    username: String
})

</script>

<style scoped>
    .username{
        color: gold;
    }
</style>