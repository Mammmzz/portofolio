// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBB6cOeoD4ElhQUpe4dOE6mRCddEikayPs",
  authDomain: "portofolio-3cbf2.firebaseapp.com",
  projectId: "portofolio-3cbf2",
  storageBucket: "portofolio-3cbf2.firebasestorage.app",
  messagingSenderId: "981150367530",
  appId: "1:981150367530:web:c9c50bfb3aa75953e72853",
  measurementId: "G-CQSPLVEXPQ"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
