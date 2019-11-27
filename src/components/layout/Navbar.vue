<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <a href class="brand-logo left">WW-Programmers</a>
        <ul class="right">
          <li>
            <router-link :to="{name:'Signup'}">Signup</router-link>
          </li>
          <li>
             <router-link :to="{name:'Login'}">Login</router-link>
          </li>
          <li>
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
    return {};
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
            console.log("Signed Out");
            this.$router.push({name:'Signup'})
        })
        .catch(err => console.error("Sign Out Error", error));
    }
  }
};
</script>

<style scoped>
nav .brand-logo {
  position: static;
}
</style>