<template>
  <Tabs :tabs="['Hot', 'New']" @change-tab="changeTab"/>
  <div v-if="!loading">
    <Finding class="mt-2" v-for="finding in findings.value" :key="finding.id" :finding="finding"/>
  </div>
  <Pages class="mt-2 mb-5" :pageCount="pages" @change-page="changePage"/>
</template>

<script setup>
import Finding from '@/components/Finding.vue';
import { onMounted, reactive, ref } from '@vue/runtime-core';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import Tabs from '@/components/Tabs.vue';
import Pages from '@/components/Pages.vue'

const findings = reactive([])
const loading = ref(true)
const store = useAuthStore()
const pages = ref(0)
const getRequest = {
  pageSize: 10,
  pageIndex: 0,
  sortingType: 0
}

function getFindings(){
  loading.value = true
  axios.get('finding/', { params: getRequest })
    .then(res => {
      findings.value = res.data
    }).then(() => {
      if(store.authorized){
        findings.value.forEach(finding => {
          axios.get('reaction/finding/' + finding.id + '/' + store.userId)
          .then(res => finding.userReaction = res.data)
        });
      }
    })
    .catch(error => console.log(error))
    .then(loading.value = false)
}

function changeTab(number){
  getRequest.sortingType = number
  getFindings()
}

function changePage(page){
  getRequest.pageIndex = page - 1

  getFindings()
}

onMounted(() => {
  axios.get('finding/count/' + getRequest.pageSize).then(res => {
    pages.value = res.data
  })
  getFindings()
})

</script>
