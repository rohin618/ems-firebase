// src/firebase-config.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";         // ✅ add this
import { getFirestore } from "firebase/firestore"; // ✅ add this

const firebaseConfig = {
  apiKey: "AIzaSyARNuvbTBxAdIkhe422aiYdujRKOKgdnh8",
  authDomain: "ems-system-2b0ae.firebaseapp.com",
  projectId: "ems-system-2b0ae",
  storageBucket: "ems-system-2b0ae.firebasestorage.app",
  messagingSenderId: "1092774936128",
  appId: "1:1092774936128:web:1666a68edb8db226b7a9a5",
  measurementId: "G-SRCELKT1S2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);   // ✅ Auth instance
export const db = getFirestore(app); // ✅ Firestore instance
