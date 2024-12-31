// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNw6ady_EUKb5DmVdn2FDZhG1Va_ze3JU",
  authDomain: "cosmetiq-8bf40.firebaseapp.com",
  projectId: "cosmetiq-8bf40",
  storageBucket: "cosmetiq-8bf40.firebasestorage.app",
  messagingSenderId: "764750772119",
  appId: "1:764750772119:web:89ce9bb72fef5dcf0436d2",
  measurementId: "G-KPWF1ZMM53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize Firestore
export const db = getFirestore(app);

// const analytics = getAnalytics(app);
export const authentication = getAuth(app);