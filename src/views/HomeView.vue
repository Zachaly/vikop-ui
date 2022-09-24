<template v-if="!loading">
  <Finding class="mt-2" v-for="finding in findings.value" :key="finding.id" :finding="finding"/>
</template>

<script setup>
import Finding from '@/components/Finding.vue';
import { onMounted, reactive, ref } from '@vue/runtime-core';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const findings = reactive([])
const loading = ref(true)
const store = useAuthStore()

onMounted(() => {
    axios.get('finding/getall')
    .then(res => {
      findings.value = res.data
    }).then(() => {
      if(store.authorized){
        findings.value.forEach(finding => {
          axios.get('finding/currentuserreaction/' + finding.id).then(res => finding.userReaction = res.data)
        });
      }
    })
    .catch(error => console.log(error))
    .then(loading.value = false)
})

</script>
