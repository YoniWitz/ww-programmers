<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{name:'GMap'}" class="brand-logo left">WW-Programmers</router-link>
        <ul class="right">
          <li>
            <router-link v-if="!user" :to="{name:'Signup'}">Signup</router-link>
          </li>
          <li>
             <router-link v-if="!user" :to="{name:'Login'}">Login</router-link>
          </li>
          <li>
             <a v-if="user">{{user.email}}</a>
          </li>
          <li v-if="user">
            <a v-on:click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
            console.log("Signed Out");
            this.$router.push({name:'Login'})
        })
        .catch(err => console.error("Sign Out Error", error));
    }
  },
  created(){
    firebase.auth().onAuthStateChanged(user =>
      this.user = user? user : null)
  }
};
</script>

<style scoped>
nav .brand-logo {
  position: static;
}
</style>