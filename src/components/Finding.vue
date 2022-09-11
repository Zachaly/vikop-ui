<template>
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-128x128">
                        <img :src="$image('FindingPicture', finding.id)" :alt="finding.title">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4"> 
                        <a @click="goToPage" >
                            {{finding.title}} {{finding.id}}
                        </a>
                    </p>
                    <p class="subtitle is-6">@{{finding.creatorName}}</p>
                    <p>
                        {{finding.description}}
                        <br>
                        <a :href="finding.link">Go to</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'finding-part'
}
</script>

<script setup>
import { defineProps, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    finding: Object
})

const route = reactive({ 
    name: 'finding',
    params:{
        id: props.finding.id
    }
})

function goToPage(){
    router.push(route)
}

</script>

<style scoped>
    .subtitle{
        color: gold;
    }
</style>