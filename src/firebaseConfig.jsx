
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "test-7c797.firebaseapp.com",
    projectId: "test-7c797",
    storageBucket: "test-7c797.appspot.com",
    messagingSenderId: "664313492779",
    appId: "1:664313492779:web:c5a3372f26830e211bc16e",
    measurementId: "G-JJWQ1DZCHX"
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider  = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app)
export const storageRef = ref(storage)

const analytics = getAnalytics(app);