// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHBTszIiuFjo0dpTV18eEboB2oLrUUBqA",
  authDomain: "lockq-73ec6.firebaseapp.com",
  databaseURL: "https://lockq-73ec6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lockq-73ec6",
  storageBucket: "lockq-73ec6.appspot.com",
  messagingSenderId: "572374126033",
  appId: "1:572374126033:web:0ec81354ba6bf766fc24f0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export the database
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
