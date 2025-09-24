// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0uEcUWqG6tOXambPI4Tljux195nbc5gw",
  authDomain: "clyro-21e5b.firebaseapp.com",
  projectId: "clyro-21e5b",
  storageBucket: "clyro-21e5b.firebasestorage.app",
  messagingSenderId: "21347891216",
  appId: "1:21347891216:web:869e7ffae960e7d3e9f295",
  measurementId: "G-V6Y59KNEX0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);