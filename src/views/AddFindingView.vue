<template>
    <div class="columns is-centered mt-1">
        <div class="column is-4">
            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                    <input class="input" v-model="findingModel.title" placeholder="Title"/>
                </div>
            </div>
            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <input class="input" v-model="findingModel.description" placeholder="Description"/>
                </div>
            </div>
            <div class="field">
                <label class="label">Link</label>
                <div class="control">
                    <input class="input" v-model="findingModel.link" placeholder="Link"/>
                </div>
            </div>
            <div class="field">
                <label class="label">Image</label>
                <div class="control">
                    <input type="file" class="input" @change="fileChange">
                </div>
            </div>
            <div class="field">
                <button class="button is-success" @click="addFinding()">Add finding</button>
            </div>
        </div>
    </div>    
</template>

<script setup>
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()

const findingModel = reactive({
    title: '',
    description: '',
    link: '',
    file: null
})

function fileChange(event){
    findingModel.file = event.target.files[0]
}

function addFinding() {
    const request = new FormData()

    request.append('title', findingModel.title)
    request.append('description', findingModel.description)
    request.append('picture', findingModel.file)
    request.append('link', findingModel.link)

    axios.post('finding/add', request, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    }).
    then(() => router.push('/')).
    catch(error => console.log(error))
}

</script>