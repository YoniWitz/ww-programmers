<template>
  <div class="signup container">
    <form v-on:submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias" />
      </div>
      <p class="red-text center">{{feedback}}</p>

      <div class="field center">
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      alias: "",
      feedback: ""
    };
  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });

        db.collection("users")
          .doc(this.slug)
          .get()
          .then(doc => {
            if (doc.exists) {
              this.feedback = "this alias is already used";
            } else {
              this.feedback = "";
              firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                  db.collection("users")
                    .doc(this.slug)
                    .set({
                      alias: this.alias,
                      geolocation: null,
                      user_id: cred.user.uid
                    });
                })
                .then(this.$router.push({ name: "GMap" }))
                .catch(err => this.feedback = err.message);
            }
          });
      } else {
        this.feedback = "Please enter alias";
      }
    }
  }
};
</script>

<style scoped>
.signup {
  max-width: 400px;
  margin-top: 60px;
}

.signup h2 {
  font-size: 2.4em;
}

.signup .field {
  margin-bottom: 16px;
}
</style>