import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzoDjPIvcwsK55JpIO-XrgLPLMGyp5jrg",
  authDomain: "test-7c797.firebaseapp.com",
  projectId: "test-7c797",
  storageBucket: "test-7c797.appspot.com",
  messagingSenderId: "664313492779",
  appId: "1:664313492779:web:c5a3372f26830e211bc16e",
  measurementId: "G-JJWQ1DZCHX",
};

// 🔹 Initialize separate Firebase app instances for different user roles
export const userApp = initializeApp(firebaseConfig, "UserAuth");
export const managerApp = initializeApp(firebaseConfig, "ManagerAuth");
export const adminApp = initializeApp(firebaseConfig, "AdminAuth");

// 🔹 Create separate auth instances for different roles
export const userAuth = getAuth(userApp);
export const managerAuth = getAuth(managerApp);
export const adminAuth = getAuth(adminApp);
export const googleProvider = new GoogleAuthProvider();

// 🔹 Firestore & Storage (Now using Manager App)
export const db = getFirestore(managerApp);
export const storage = getStorage(managerApp);
export const storageRef = ref(storage);

// 🔹 Enable Persistence
const initializeAuth = async () => {
  await setPersistence(userAuth, browserLocalPersistence);
  await setPersistence(managerAuth, browserLocalPersistence);
  await setPersistence(adminAuth, browserLocalPersistence);
};

initializeAuth();
