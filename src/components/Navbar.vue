<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
                Home page
            </router-link>
        </div>
        <div class="navbar-end" v-if="!store.authorized">
            <div class="navbar-item">
                <router-link to="/login">
                    Login
                </router-link>
            </div>
            <div class="navbar-item">
                <router-link to="/register">
                    Register
                </router-link>
            </div>
        </div>
        <div class="navbar-end" v-else>
            <div class="navbar-item">
                <img class="mr-3" :src="$image('ProfilePicture', store.userId)" :alt="store.username"/>
                {{store.username}}
            </div>
            <div class="navbar-item" @click="store.logout()">
                Logout
            </div>
        </div>
    </nav>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';

export default {
    name: 'nav-bar',
    setup(){
        const store = useAuthStore();

        return {
            store
        }
    }
}
</script>
