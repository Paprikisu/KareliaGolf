import firebase from "firebase/compat/app";

import "firebase/compat/auth"

import "firebase/compat/firestore"

// Firebasen config tiedosto

const firebaseConfig = {
    apiKey: "AIzaSyAwerO8EVrunWOtnqHaS0fETIi39i8La0c",
    authDomain: "kareliagolf-tietokanta.firebaseapp.com",
    projectId: "kareliagolf-tietokanta",
    storageBucket: "kareliagolf-tietokanta.appspot.com",
    messagingSenderId: "607280934518",
    appId: "1:607280934518:web:ea9dfcafc90e1a95fdb957"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};