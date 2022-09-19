<template>
<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img :src="$image('profilepicture', comment.creatorId)" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="subtitle is-6">{{comment.creatorName}}</p>
      </div>
      <div class="media-right">
        <div class="subtitle">
          <span class="mr-3">{{comment.reactions}}</span>
          <button @click="reaction(1)" class="button is-success is-small"><span class="is-v-centered">+</span></button>
          <button @click="reaction(-1)" class="button is-danger is-small"><span class="is-v-centered">-</span></button>
        </div>
      </div>
    </div>

    <div class="content">
      {{comment.content}}
    </div>
  </div>
</div>

</template>

<script>
export default {
    name: 'comment-part'
}
</script>

<script setup>
import { defineProps } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

const store = useAuthStore()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    comment: Object
})

function reaction(reaction){
    if(!store.authorized){
        alert('You must be logged in to do this!')
        return
    }

    axios.post('/comment/addreaction', { id: props.comment.id, reaction }).then(res => {
        if(!res.data){
            if(props.comment.userReaction !== reaction){
                axios.put('comment/changereaction', { id: props.comment.id, reaction}).catch(error => console.log(error))
            }
            else{
                axios.delete('comment/deleteReaction/' + props.comment.id).catch(error => console.log(error))
            }
        }
    }).catch(error => console.log(error))
}
</script>

<style scoped>
  .button{
    font-family: monospace;
  }
</style>