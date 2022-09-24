<template>
  <Tabs :tabs="['Hot', 'New']" @change-tab="changeTab"/>
  <div v-if="!loading">
    <Finding class="mt-2" v-for="finding in findings.value" :key="finding.id" :finding="finding"/>
  </div>
</template>

<script setup>
import Finding from '@/components/Finding.vue';
import { onMounted, reactive, ref } from '@vue/runtime-core';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import Tabs from '@/components/Tabs.vue';

const findings = reactive([])
const loading = ref(true)
const store = useAuthStore()
const tab = ref(0)

function getTopFindings(){
  loading.value = true
  axios.get('finding/hot')
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
}

function getNewFindings(){
  loading.value = true
  axios.get('finding/new')
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

}

function changeTab(number){
  if(number === 0){
    getTopFindings()
  }
  else if (number === 1){
    getNewFindings()
  }

  tab.value = number
}

onMounted(() => {
  getTopFindings()
})

</script>
