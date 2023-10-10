// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNZOyt0CyCqUG2bVu6CMJnL_qCbtMaFLw",
  authDomain: "track-money-a3246.firebaseapp.com",
  projectId: "track-money-a3246",
  storageBucket: "track-money-a3246.appspot.com",
  messagingSenderId: "328509919366",
  appId: "1:328509919366:web:7bebf67dfa6b6f95ef0107"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db};