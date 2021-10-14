import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3KGs8WaMURQaaS9Sc4tudOc3vrehJKoQ",
  authDomain: "chillhacks-ad5c2.firebaseapp.com",
  projectId: "chillhacks-ad5c2",
  storageBucket: "chillhacks-ad5c2.appspot.com",
  messagingSenderId: "237475884609",
  appId: "1:237475884609:web:cfb6f6cc9d25755a6560c0",
  measurementId: "G-SP8CLXZP87"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
