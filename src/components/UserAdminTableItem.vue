<template >
    <tr v-if="user.rank !== 100">
        <td>
            <figure class="image is-64x64">
                <img :src="$image('ProfilePicture', user.id)"/>
            </figure>
        </td>
        <td>{{user.id}}</td>
        <td><router-link :to="`profile/${user.id}`">{{user.username}}</router-link></td>
        <td>{{user.rank}}</td>
        <td >
            <button v-if="!moderator" class="button is-warning" @click="addModerator">Add moderator</button>
            <button v-else class="button is-danger" @click="removeModerator">Remove moderator</button>
        </td>
    </tr>
</template>

<script setup>
import axios from 'axios';
import { defineProps, ref } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    user: Object
})

const moderator = ref(props.user.rank === 10)

function addModerator(){
    axios.put('role/add', { userId: props.user.id, role: 'Moderator'}).then(res => {
        if(res.data.code > 0){
            moderator.value = true
        }
    })
}

function removeModerator(){
    axios.put('role/remove', { userId: props.user.id, role: 'Moderator'}).then(res => {
        if(res.data.code > 0){
            moderator.value = false
        }
    })
}

</script>