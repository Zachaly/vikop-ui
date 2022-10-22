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
        <p class="subtitle is-6">
          <UserName :username="comment.creatorName" :id="comment.creatorId" :rank="comment.creatorRank"/> 
          <span class="ml-3">{{comment.created}}</span>
          <span v-for="tag in tags" :key="tag"> #{{tag.name}}</span>
        </p>
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
      <p>{{comment.content}}</p>
      <p v-if="comment.hasPicture">
        <img  :src="$image('commentpicture', comment.id)"/>
      </p>
    </div>
    <button class="button" v-if="!subcomment" @click="getSubcomments">Load subcomments</button>
  </div>
  <div class="mb-1 mr-1 p-5" v-if="loadSubcomments" >
    <div class="columns mt-1" v-for="subcomment in subcomments" :key="subcomment.id">
      <div class="column is-1"></div>
      <div class="column is-11">
        <Comment :comment="subcomment" :subcomment="true"/>
      </div>
    </div>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-11">
        <AddComment class="m-1" @add-comment="addSubcomment"/>
      </div>
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
import { defineProps, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';
import AddComment from './AddComment.vue';
import UserName from './UserName.vue';

const store = useAuthStore()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    comment: Object,
    subcomment: Boolean,
    tags: Array
})

const loadSubcomments = ref(false)

const subcomments = ref([])

function getSubcomments(){
  if(loadSubcomments.value){
    loadSubcomments.value = false
    return
  }
  axios.get('comment/subcomments/' + props.comment.id).then(res => {
    subcomments.value = res.data
    loadSubcomments.value = true
  })
}

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

function addSubcomment(commentModel){
  const request = new FormData()
  request.append('content', commentModel.content)
  request.append('picture', commentModel.file)
  request.append('commentId', props.comment.id)

  axios.post('comment/addsubcomment', request)
  .then(res => subcomments.value.push(res.data))
}
</script>

<style scoped>
  .button{
    font-family: monospace;
  }
  .column{
    padding: 0;
  }
</style>