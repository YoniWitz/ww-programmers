<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="deep-purple-text center">{{profile.alias}}'s profile</h2>
      <ul class="comments collection" >
        <li v-for="(comment, index) in comments" v-bind:key="index">
            <div class="deep-purple-text"> 
                {{comment.from}}: <span class="grey-text text-darken-2">{{comment.comment}}</span>
            </div>
        </li>
      </ul>
    </div>
    <NewComment :profile="profile" :user="user" />
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init.js";
import NewComment from "@/components/profile/NewComment.vue";
export default {
  name: "ViewProfile",
  components:{
      NewComment
    },
  data() {
    return {
      profile: null,
      comments: [],
      
      user: null,
     
    };
  },
  created() {
    let profile_id = this.$route.params.id;

    //get profile
    db.collection("users")
      .doc(profile_id)
      .get()
      .then(profile => {
          this.profile = profile.data();
          this.profile.id = profile.id;
      });

    //get comments
    // db.collection("comments")
    //   .where("to", "==", profile_id)
    //   .get()
    //   .then(comments => {
    //     comments.forEach(comment => {
    //       let temp = comment.data();
    //       temp.id = comment.id;
    //       this.comments.push(temp);
    //     });
    //   });

    db.collection('comments')
    .where("to", "==", profile_id)
    //.orderBy('time')
    .onSnapshot(snapshot => {
        snapshot.docChanges()
        .forEach(change =>{
            if(change.type === 'added'){
                let doc = change.doc.data();
                doc.id = change.doc.id;
                this.comments.push(doc);
            }
        })
    })

    //get user
    db.collection("users")
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(users => {
        this.user = users.docs[0].data();
        this.user.id = users.docs[0].id;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.view-profile .card{
    padding: 20px;
    margin-top: 60px;

}

.view-profile h2{
    font-size:2em;
    margin-top:0;
}

.view-profile li{
    padding:10px;
    border-bottom:1px solid #eee
}
</style>