import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3KGs8WaMURQaaS9Sc4tudOc3vrehJKoQ",
  authDomain: "chillhacks-ad5c2.firebaseapp.com",
  projectId: "chillhacks-ad5c2",
  storageBucket: "chillhacks-ad5c2.appspot.com",
  messagingSenderId: "237475884609",
  appId: "1:237475884609:web:cfb6f6cc9d25755a6560c0",
  measurementId: "G-SP8CLXZP87"
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
