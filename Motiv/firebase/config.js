// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getAuth} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuJIAQZ7EsG-7Qw8g-tW0-8vE-4AlJlE4",
  authDomain: "motiv-9a4b8.firebaseapp.com",
  databaseURL: "https://motiv-9a4b8-default-rtdb.firebaseio.com",
  projectId: "motiv-9a4b8",
  storageBucket: "motiv-9a4b8.appspot.com",
  messagingSenderId: "808176307473",
  appId: "1:808176307473:web:c639bc39884f6dd73010b0",
  measurementId: "G-YB0RPY0GQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth();