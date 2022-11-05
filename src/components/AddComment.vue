<template>
    <div v-if="store.authorized">
        <textarea class="input" v-model="commentModel.content"></textarea>
        <input class="input" type="file" @change="fileChange"/>
        <input v-if="post" class="input" v-model="commentModel.tags"/>
        <button class="button is-success" @click="addComment">Add comment</button>
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { reactive, defineEmits, defineProps } from "vue";

const store = useAuthStore()

const emit = defineEmits(['add-comment'])

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    post: Boolean
})

const commentModel = reactive({
    content: '',
    file: null,
    tags: ''
})

function fileChange(e){
    commentModel.file = e.target.files[0]
}

function addComment(){
    emit('add-comment', commentModel)
    commentModel.content = ''
    commentModel.file = null,
    commentModel.tags = ''
}
</script>