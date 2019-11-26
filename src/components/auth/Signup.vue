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
        <input type="text" name="alias"  v-bind:value="alias" disabled/>
      </div>
      <p class="red-text center">{{feedback}}</p>
     
      <div class="field center">
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/Firebase/init'
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      alias: "",
      feedback: "",
      slug:""
    };
  },
  methods: {
    signup() {
      if (this.alias && this.feedback ==="") {
         this.slug=alias;          
      } else {
        this.feedback = "Please enter unused email";
      }
    }
  },
  watch:{
    email(newEmail, oldEmail){
      this.alias= slugify(newEmail, {
        replacement: '-',
        remove: /[$*_+~.()'"!\-:@']/g,
        lower:true
      })

      db.collection('users').doc(this.alias).get()
      .then(doc => {
        if(doc.exists){
          this.feedback = "this email is already used";
        }
        else{
          this.feedback = "go ahead, sign up";
        }
      })
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