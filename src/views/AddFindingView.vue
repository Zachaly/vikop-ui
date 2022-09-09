<template>
    <div class="columns is-centered mt-1">
        <div class="column is-4">
            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                    <input class="input" v-model="findingModel.title" placeholder="Title"/>
                </div>
            </div>
            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <input class="input" v-model="findingModel.description" placeholder="Description"/>
                </div>
            </div>
            <div class="field">
                <label class="label">Link</label>
                <div class="control">
                    <input class="input" v-model="findingModel.link" placeholder="Link"/>
                </div>
            </div>
            <div class="field">
                <button class="button is-success" @click="addFinding">Add finding</button>
            </div>
        </div>
    </div>    
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            findingModel: {
                title: '',
                description: '',
                picture: 'placeholder.jpg',
                link: '',
                creatorId: ''
            }
        }
    },
    methods:{
        addFinding(){
            axios.post('finding/add', this.findingModel).
            then(() => this.$router.push('/')).
            catch(error => console.log(error))
        }
    }
}
</script>