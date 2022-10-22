<template class="has-background-grey-light has-text-info-light">
    <div class="has-background-grey-dark has-text-info-light p-5">
        <span v-for="tag in tags" :key="tag">#{{tag.name}}&nbsp;</span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    tags: Array
})

</script>