<template>
    <button v-if="authStore.authorized" class="button is-danger" @click="report">Report</button>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
import { defineProps } from 'vue'

const props = defineProps({
    type: String,
    objectId: Number
})

const authStore = useAuthStore()

function report(){
    const reason = prompt("Enter reason")
    axios.post(`Report/${props.type}`, { reason, objectId: props.objectId }).catch(error => console.log(error))
}
</script>