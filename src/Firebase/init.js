import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyC855Lty_fIyskLZMU6lVAb7EXWUhbKsho",
    authDomain: "ww-programmers.firebaseapp.com",
    databaseURL: "https://ww-programmers.firebaseio.com",
    projectId: "ww-programmers",
    storageBucket: "ww-programmers.appspot.com",
    messagingSenderId: "653983703178",
    appId: "1:653983703178:web:65bde035cb5f9eefcc8d73"
  };
  // Initialize Firebase
 const firebaseApp = firebase.initializeApp(firebaseConfig);

 export default firebaseApp.firestore()