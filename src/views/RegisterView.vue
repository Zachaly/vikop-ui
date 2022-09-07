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
                    <input class="input" type="password" v-model="confirmPassword" placeholder="Confirm Password"/>
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

<script>
import axios from 'axios'

export default {
    data(){
        return {
            registerModel: {
                username: '',
                password: '',
                email: ''
            },
            confirmPassword: '',
        }
    },
    methods: {
        register(){
            if(this.confirmPassword !== this.registerModel.password)
                return;
            
            axios.post('User/Register/', this.registerModel)
            .then(() => this.$router.push('/')).
            catch(error => {
                console.log(error);
            })
        }
    }
}
</script>