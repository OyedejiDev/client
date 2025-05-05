// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-v.firebaseapp.com",
  projectId: "mern-v",
  storageBucket: "mern-v.firebasestorage.app",
  messagingSenderId: "596140053750",
  appId: "1:596140053750:web:3e55c2113ea985774dc8d7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);