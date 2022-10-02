<template>
    <div v-if="store.authorized">
        <textarea class="input" v-model="commentModel.content"></textarea>
        <input class="input" type="file" @change="fileChange"/>
        <button class="button is-success" @click="addComment">Add comment</button>
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { reactive, defineEmits } from "vue";

const store = useAuthStore()

const emit = defineEmits(['add-comment'])

const commentModel = reactive({
    content: '',
    file: null
})

function fileChange(e){
    commentModel.file = e.target.files[0]
}

function addComment(){
    emit('add-comment', commentModel)
    commentModel.content = ''
    commentModel.file = null
}
</script>