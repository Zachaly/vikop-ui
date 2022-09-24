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
                        <router-link :to="`/finding/${finding.id}`" >
                            {{finding.title}}
                        </router-link>
                    </p>
                    <p class="subtitle is-6">
                        <router-link :to="`/profile/${finding.creatorId}`" class="username">@{{finding.creatorName}}</router-link>
                        <span class="ml-2">{{finding.created}}</span>
                    </p>
                    
                    <p>
                        {{finding.description}}
                        <br>
                        <a :href="finding.link">Go to</a>
                    </p>
                </div>

                <div class="media-right">
                    <p class="title has-text-centered">
                        {{finding.reactions}}
                    </p>
                    <p>
                        <button class="button is-success is-fullwidth" @click="reaction(1)">Dig</button>
                    </p> 
                    <p class="mt-1">
                        <button class="button is-warning is-fullwidth" @click="reaction(-1)">Bury</button>
                    </p>
                    <p class="mt-1">
                        {{finding.commentCount}} comments
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
import { defineProps,  } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

const store = useAuthStore()

const props = defineProps({
    finding: Object
})

function reaction(reaction){
    if(!store.authorized){
        alert('You must be logged in to do this!')
        return
    }

    axios.post('/finding/addreaction', { id: props.finding.id, reaction }).then(res => {
        if(!res.data){
            if(props.finding.userReaction !== reaction){
                axios.put('finding/changereaction', { id: props.finding.id, reaction}).catch(error => console.log(error))
            }
            else{
                axios.delete('finding/deleteReaction/' + props.finding.id).catch(error => console.log(error))
            }
        }
    }).catch(error => console.log(error))
}

</script>

<style scoped>
    .username{
        color: gold;
    }
</style>