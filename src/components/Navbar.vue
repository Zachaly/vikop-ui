<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
                Home page
            </router-link>
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <router-link to="/register" class="button is-success">
                    Register
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'nav-bar'
}
</script>