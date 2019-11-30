<template>
    <div class="view-profile container">
        <div v-if="profile" class="card">
            <h2 class="deep-purple-text center">{{profile.alias}}'s profile</h2>
            <ul v-for="(comment,index) in comments" v-bind:key=index>
                <li>{{comment.from}} : {{comment.comment}}</li>
            </ul>
        </div>
          <form @submit.prevent="addComment">         
            <label for="new-comment">New Comment</label>
            <input type=text name="new-comment" v-model="newComment"/> 
             <p class="red-text">{{feedback}}</p>
            <button type="submit">Send Comment</button>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init.js'
import NewMessage from '../profile/NewComment.vue'
export default {
    name: 'ViewProfile',
    data(){
        return{
            profile: null,
            comments:[],
            feedback:"",
            user:null,
            newComment: ""
        }
    },
    created(){
        let profile_id = this.$route.params.id;

        //get profile
        db.collection('users').doc(profile_id)
        .get()
        .then(profile => this.profile = profile.data());

        //get comments
        db.collection('comments').where('to', '==', profile_id)
        .get()
        .then(comments =>{
            comments.forEach(comment => {
                let temp = comment.data();
                temp.id = comment.id;
                this.comments.push(temp);
            })
        })

        //get user
        db.collection('users').where('user_id', '==', firebase.auth().currentUser.uid)
        .get().then(users => {
            this.user = users.docs[0].data();
            this.user.id = users.docs[0].id;
        }).catch(err => console.log(err));
        
    },
    methods:{
        addComment(){
            this.feedback = "";
            if(this.newComment){
                //save new comment
                db.collection('comments').add({
                    to : this.profile.id,
                    from: this.user.id,
                    comment : this.newComment,
                    time : Date.now()
                }).then(() =>{
                    this.newComment = ""
                }).catch(err =>{
                    console.log('error');
                })
            }
            else{
                this.feedback = "You must enter a message";
            }
        }
    }
}
</script>

<style scoped>

</style>