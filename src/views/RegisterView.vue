<template>
    <div class="columns is-centered mt-1">
        <div class="column is-4">
            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                    <input class="input" v-model="registerModel.username" placeholder="Username"/>
                </div>
                <span class="help is-warning" v-for="error in errors.username" :key="error">{{error}}</span>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" v-model="registerModel.email" placeholder="Email"/>
                </div>
                <span class="help is-warning" v-for="error in errors.email" :key="error">{{error}}</span>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="registerModel.password" placeholder="Password"/>
                    <span class="help is-warning" v-for="error in errors.password" :key="error">{{error}}</span>
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

const errors = reactive({
    email: [],
    password: [],
    username: []
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
    catch(error => {
        console.log(error)

        const response = error.response.data.errors

        errors.email = response.Email
        errors.password = response.Password
        errors.username = response.Username
    })
}
</script>