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


// eslint-disable-next-line no-unused-vars
const props = defineProps({
    comment: Object
})

console.log(props.comment)

</script>