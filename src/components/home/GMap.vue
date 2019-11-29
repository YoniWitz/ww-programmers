<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "GMap",
  data() {
    return {
      lat: 53,
      lng: -2
    };
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
          this.saveGeoLocationToUser();
        },
        err => {
          console.log(err);
          this.renderMap();
        },
        { maximumAge: "6000", timeout: "3000" }
      );
    } else {
      this.renderMap(); //using default values
    }
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });

      db.collection("users")
        .get()
        .then(users => {
          users.forEach(doc => {
            let geolocation = doc.data().geolocation;

            if (geolocation.lat && geolocation.lng) {
              let marker = new google.maps.Marker({
                position: geolocation,
                map: map,
                title: doc.data().alias
              });

              marker.addListener("click", function() {
                map.setZoom(8);
                map.setCenter(marker.getPosition());
                console.log(marker.title);
              });
            }
          });
        })
        .catch(err => console.log(err));
    },
    saveGeoLocationToUser() {
      let uid = firebase.auth().currentUser.uid;

      db.collection("users")
        .where("user_id", "==", uid)
        .get()
        .then(response => {
          let id = response.docs[0].id;
          db.collection("users")
            .doc(id)
            .update({
              geolocation: { lat: this.lat, lng: this.lng }
            })
            .catch(err => console.log(err));
        })
        .then(() => this.renderMap())
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>