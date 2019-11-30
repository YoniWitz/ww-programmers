<template>
    <div class="new-comment">
        <form @submit.prevent="addComment">
            <label for="new-comment">New Comment (press enter to add comment)</label>
            <input type=text name="new-comment" v-model="newComment"/> 
            <p class="red-text">{{feedback}}</p>
        </form>
    </div>
</template>

<script>
import db from '@/Firebase/init.js'
export default {
    name:'NewComment',
    props:['alias'],
    data(){
        return {
            newComment:"",
            feedback: ""
        }
    },
    methods:{
        addMessage(){
            this.feedback = "";
            if(this.newMessage){
                db.collection('comments').add({                  
                    comment : this.newMessage,
                    time : Date.now(),
                    from : this.alias,
                    to: this.alias
                }).then(() =>{
                    this.newComment = ""
                }).catch(err =>{
                    console.log('error');
                })
            }
            else{
                this.feedback = "You must enter a comment";
            }
        }
    }
}
</script>

<style scoped>
</style>