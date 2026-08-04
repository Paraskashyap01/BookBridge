

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

console.log("API Key:", import.meta.env.VITE_apiKey);
console.log("Project ID:", import.meta.env.VITE_projectId);
console.log("All env:", import.meta.env);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

console.log("Firebase initialized with config:", firebaseConfig);
console.log("Firebase Auth instance:", auth);