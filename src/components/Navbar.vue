<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    Home page
                </router-link>
                <router-link to="/freespace" class="navbar-item">
                    Free space
                </router-link>
            </div>
            <div class="navbar-start">
                <div class="navbar-item">
                    <router-link to="/search">
                        Search
                    </router-link>
                </div>
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
                <div v-if="store.isModerator || store.isAdmin" class="navbar-item">
                    <router-link to="/moderation">
                        Moderation panel
                    </router-link>
                </div>
                <div v-if="store.isAdmin" class="navbar-item">
                    <router-link to="/admin">
                        Admin panel
                    </router-link>
                </div>
                <div class="navbar-item">
                    <router-link to="/addfinding">
                        Add finding
                    </router-link>
                </div>
                <div class="navbar-item">
                    <router-link :to="`/profile/${store.userId}`">
                        <img class="mr-3" :src="$image('ProfilePicture', store.userId)" :alt="store.username"/>
                        <span class="is-vcentered">{{store.username}}</span>
                    </router-link>
                </div>
                <div class="navbar-item" @click="store.logout(); router.push('/login')">
                    Logout
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'nav-bar',
}
</script>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const store = useAuthStore();

const router = useRouter()

</script>
