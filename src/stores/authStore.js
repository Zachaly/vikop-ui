import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({ authorized: false, userId: '', username: '' }),
    actions:{
        login(credentials) {
            return axios.post('user/login', credentials).
            then(res => {
                this.authorized = true;
                axios.defaults.headers.common.Authorization = `Bearer ${res.data}`
            }).then(() => {
                axios.get('user/id').
                then(res => this.userId = res.data).
                then(() => axios.get('user/getuser/' + this.userId).
                    then(res => this.username = res.data.userName));
            })
        },
        logout(){
            this.authorized = false;
            this.userId = '';
            this.username = '';
            axios.defaults.headers.common.Authorization = '';
        }
    }
})