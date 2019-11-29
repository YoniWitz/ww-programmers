<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{name:'GMap'}">WW-Programmers</router-link>
        <ul class="right">
          <li>
            <router-link v-if="!loggedIn" :to="{name:'Signup'}">Signup</router-link>
          </li>
          <li>
             <router-link v-if="!loggedIn" :to="{name:'Login'}">Login</router-link>
          </li>
          <li v-if="loggedIn">
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
      loggedIn: false
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
            this.loggedIn = false;
        })
        .catch(err => console.error("Sign Out Error", error));
    }
  },
  created(){
    let user = firebase.auth().currentUser
    this.loggedIn = user? true : false
  }
};
</script>

<style scoped>
nav .brand-logo {
  position: static;
}
</style>