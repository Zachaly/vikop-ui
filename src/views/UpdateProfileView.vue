<template>
    <div class="columns is-centered mt-1">
        <div class="column is-4">
            <div class="field">
                <div class="control">
                    <label class="label">Username</label>
                    <input class="input" v-model="updateModel.userName">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <label class="label">Profile picture</label>
                </div>
                <input type="file" class="input" @change="fileChange">
            </div>
            <div class="field">
                <button class="button is-success" @click="update">Update</button>
            </div>
        </div>
    </div>    
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const store = useAuthStore()
const router = useRouter()

const updateModel = reactive({
    userName: store.username,
    file: null
})

function fileChange(event){
    updateModel.file = event.target.files[0]
}

function update(){
    const request = new FormData()
    request.append('userName', updateModel.userName)
    request.append('profilePicture', updateModel.file)

    axios.put('user/update', request, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    }).then(() => { 
        store.username = updateModel.userName
        router.push('/profile/' + store.userId) 
    })
    .catch(error => console.log(error))
}

onMounted(() => {
    if(!store.authorized){
        router.push('/login')
    }
})
</script>