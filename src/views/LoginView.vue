<template>
    <div class="columns is-centered mt-1">
        <div class="column is-4">
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" v-model="loginModel.email" placeholder="Email"/>
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="loginModel.password" placeholder="Password"/>
                </div>
            </div>
            <div class="field ">
                <div class="control">
                    <button class="button is-success" @click="store.login(loginModel).then(this.$router.push('/'))">Login</button>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import { useAuthStore } from '@/stores/authStore';

export default {
    setup(){
        const store = useAuthStore();

        return {
            loginModel: {
                email: '',
                password: ''
            },
            store
        }
    }
}
</script>