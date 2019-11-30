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
            from: this.user.alias,
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
button {
  cursor: pointer;
  padding: 0.85rem 2.29rem;
  border-radius: 4px;
  margin-right: 1.36rem;
  background-color: #4c7ef3;
  font-size: 1.14rem;
  color: #ffffff;
  transition: 0.25s;
}
button:hover {
  background-color: #1e5df1;
}
</style>