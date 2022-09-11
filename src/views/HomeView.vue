<template v-if="!loading">
  <Finding  class="mt-2" v-for="finding in findings.value" :key="finding.id" :finding="finding"/>
</template>

<script setup>
import Finding from '@/components/Finding.vue';
import { onMounted, reactive, ref } from '@vue/runtime-core';
import axios from 'axios';

const findings = reactive([])
const loading = ref(true)

onMounted(() => {
    axios.get('finding/getall')
    .then(res => findings.value = res.data)
    .catch(error => console.log(error))
    .then(loading.value = false)
})

</script>
