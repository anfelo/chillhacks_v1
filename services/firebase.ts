import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3KGs8WaMURQaaS9Sc4tudOc3vrehJKoQ",
  authDomain: "chillhacks-ad5c2.firebaseapp.com",
  projectId: "chillhacks-ad5c2",
  storageBucket: "chillhacks-ad5c2.appspot.com",
  messagingSenderId: "237475884609",
  appId: "1:237475884609:web:cfb6f6cc9d25755a6560c0",
  measurementId: "G-SP8CLXZP87"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const storage = firebase.storage();
