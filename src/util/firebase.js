// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoD1YhDCwDVKiUt4DQQ2ioMjeE8bL3ocI",
  authDomain: "cdn-jokay.firebaseapp.com",
  projectId: "cdn-jokay",
  storageBucket: "cdn-jokay.appspot.com",
  messagingSenderId: "983283206881",
  appId: "1:983283206881:web:3ddba61d828d455b3e45a0",
  measurementId: "G-ETY59T58QJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app,"cdn-jokay.appspot.com")