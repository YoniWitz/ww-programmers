<template>
  <form @submit.prevent="addComment">
    <label for="new-comment">New Comment</label>
    <input type="text" name="new-comment" v-model="newComment" />
    <p class="red-text">{{feedback}}</p>
    <button type="submit">Send Comment</button>
  </form>
</template>

<script>
import db from "@/firebase/init.js";
export default {
  name: "NewComment",
  props: ["user", "profile"],
  data() {
    return {
      newComment: "",
      feedback: ""
    };
  },
  methods: {
    addComment() {
      this.feedback = "";
      if (this.newComment) {
        //save new comment
        db.collection("comments")
          .add({
            to: this.profile.id,
            from: this.user.id,
            comment: this.newComment,
            time: Date.now()
          })
          .then(() => {
            this.newComment = "";
          })
          .catch(err => {
            console.log("error");
          });
      } else {
        this.feedback = "You must enter a message";
      }
    }
  }
};
</script>

<style scoped>
</style>