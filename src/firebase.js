
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB89HbteGYWHifDlAyJMBBSGiOMauDYTDg",
  authDomain: "linked-in-clone-91950.firebaseapp.com",
  projectId: "linked-in-clone-91950",
  storageBucket: "linked-in-clone-91950.appspot.com",
  messagingSenderId: "646929181242",
  appId: "1:646929181242:web:8b4ee99e2c3c22fa58e303",
  measurementId: "G-D4LR6EYKVL",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage, firebaseApp, db };
export default db;
