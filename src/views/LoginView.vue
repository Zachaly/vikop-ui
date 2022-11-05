<template>
    <div class="columns is-centered mt-1">
        <div class="column is-4">
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" v-model="loginModel.email" placeholder="Email"/>
                </div>
                <span class="help is-warning" v-for="error in errors" :key="error">{{error}}</span>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="loginModel.password" placeholder="Password"/>
                </div>
                <span class="help is-warning" v-for="error in errors" :key="error">{{error}}</span>
            </div>
            <div class="field ">
                <div class="control">
                    <button class="button is-success" @click="login">Login</button>
                </div>
            </div>
        </div>
    </div>    
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { reactive, ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const errors = ref([]);
const store = useAuthStore();
const router = useRouter();
const loginModel = reactive({
    email: '',
    password: ''
});

function login(){
    store.login(loginModel).catch(error => {
        errors.value = error.response.data.errors.InvalidPasses;
    }).then(() => {
        if(store.authorized){
            router.push('/');
        }
    })
}

</script>