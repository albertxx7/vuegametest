// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk1RpDy1dWugV17oxYOjSFQqeq5sdpvq0",
  authDomain: "vuegameshop.firebaseapp.com",
  projectId: "vuegameshop",
  storageBucket: "vuegameshop.appspot.com",
  messagingSenderId: "597642571607",
  appId: "1:597642571607:web:91ca4dd95acda0ec695812",
  measurementId: "G-2NXFBFEGCK"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {app,analytics,db,storage,firebaseApp};