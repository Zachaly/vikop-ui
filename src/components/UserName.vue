<template>
    <router-link :to="`/profile/${id}`" :class="color">@{{username}}</router-link>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    id: String,
    username: String,
    rank: Number
})

const color = ref('green');

onMounted(() => {
    if(props.rank === 1){
        color.value = 'orange'
    }
    else if(props.rank === 2){
        color.value = 'red'
    }
})

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
</style>