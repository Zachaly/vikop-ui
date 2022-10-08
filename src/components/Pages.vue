<template>
    <nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" @click="changePage(currentPage - 1)" v-if="currentPage != 1">
            Previous
        </a>
        <a class="pagination-next" @click="changePage(currentPage + 1)" v-if="currentPage != pageCount">
            Next page
        </a>
        <ul class="pagination-list" >
            <li v-for="page in pageCount" :key="page">
                <a :class="{'is-current': page === currentPage, 'pagination-link': true}" aria-label="Page 1" aria-current="page" @click="changePage(page)">
                    {{page}}
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'pages-comp'
}
</script>

<script setup>
import { defineProps, ref, defineEmits } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    pageCount: Number
})

const currentPage = ref(1)
const emit = defineEmits(['change-page'])

function changePage(page){
    currentPage.value = page
    emit('change-page', page)
}

</script>
