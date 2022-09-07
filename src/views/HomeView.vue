<template>
  <h1>Home</h1>
  <p v-for="user in users" :key="user.id">{{user.id}} {{user.username}}</p>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      users: []
    }
  },
  methods:{
    getUsers(){
      axios.get('user/users').then(res => this.users = res.data)
    }
  },
  created(){
    this.getUsers();
  }
}
</script>
