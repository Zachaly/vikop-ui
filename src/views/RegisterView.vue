<template>
    <div class="columns is-centered mt-1">
        <div class="column is-4">
            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                    <input class="input" v-model="registerModel.username" placeholder="Username"/>
                </div>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" v-model="registerModel.email" placeholder="Email"/>
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="registerModel.password" placeholder="Password"/>
                </div>
            </div>
            <div class="field">
                <label class="label">Confirm Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="registerModel.confirmPassword" placeholder="Confirm Password"/>
                </div>
            </div>
            <div class="field ">
                <div class="control">
                    <button class="button is-success" @click="register">Register</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { reactive } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const router = useRouter()

const registerModel = reactive({
    username: '',
    password: '',
    email: '',
    confirmPassword: ''
})

function register(){
    if(registerModel.confirmPassword !== registerModel.password)
        return;

    const request = {
        username: registerModel.username,
        password: registerModel.password,
        email: registerModel.email
    }

    axios.post('User/Register/', request)
    .then(() => router.push('/')).
    catch(error => console.log(error))
}
</script>