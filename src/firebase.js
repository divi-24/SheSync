// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaW0508bkEbD7RdX7ot71CR-2eQBoxsP4",
  authDomain: "shesync-9b589.firebaseapp.com",
  projectId: "shesync-9b589",
  storageBucket: "shesync-9b589.appspot.com",
  messagingSenderId: "418450678119",
  appId: "1:418450678119:web:587af95ca6ed29d1c08fc2",
  measurementId: "G-8S2XJRWW55",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
