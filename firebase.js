// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6Rv_l8zSAChLqEAA-jjn9Jzv0VO_wQDU",
  authDomain: "workouttracker-ece26.firebaseapp.com",
  projectId: "workouttracker-ece26",
  storageBucket: "workouttracker-ece26.appspot.com",
  messagingSenderId: "95975139824",
  appId: "1:95975139824:web:1cdddfa8dcc5485bba1535",
  measurementId: "G-RQTBKJW4X8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);