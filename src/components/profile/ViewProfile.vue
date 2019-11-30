<template>
    <div class="view-profile container">
    <div class="card">
        <h2 class="deep-purple-text center">{{profile.alias}}'s profile</h2>
        
    </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init.js'
export default {
    name: 'ViewProfile',
    data(){
        return{
            profile: null
        }
    },
    created(){
        db.collection('users').doc(this.$route.params.id)
        .get()
        .then(user => this.profile = user.data())
    }
}
</script>

<style scoped>

</style>