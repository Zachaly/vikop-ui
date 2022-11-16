import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({ authorized: false, userId: '', username: '', claims: [] }),
    actions: {
        login(credentials) {
            return axios.post('user/login', credentials).
                then(res => {
                    this.authorized = true;
                    axios.defaults.headers.common.Authorization = `Bearer ${res.data.data.token}`
                    this.claims = res.data.data.claims
                }).then(() => {
                    axios.get('user/id').
                        then(res => this.userId = res.data).
                        then(() => axios.get('user/profile/' + this.userId).
                            then(res => this.username = res.data.userName));
                })
        },
        logout() {
            this.authorized = false;
            this.userId = '';
            this.username = '';
            this.claims = []
            axios.defaults.headers.common.Authorization = '';
        },
        //isModerator() {return this.claims.includes('Moderator') },
        //isAdmin() { return this.claims.includes('Admin') }
    },
    getters: {
        isModerator: state => state.claims.includes('Moderator'),
        isAdmin: state => state.claims.includes('Admin')
    }
})