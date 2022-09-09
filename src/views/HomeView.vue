<template>
  <Finding class="mt-2" v-for="finding in findings" :key="finding.id" :finding="finding"/>
</template>

<script>
import axios from 'axios'
import Finding from '@/components/Finding.vue'

export default{
    data() {
        return {
            findings: []
        };
    },
    created() {
        axios.get("finding/getall").then(res => this.findings = res.data);
    },
    components: { Finding }
}
</script>
