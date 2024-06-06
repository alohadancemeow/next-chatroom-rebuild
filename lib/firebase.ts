import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
  authDomain: "alien-paratext-321411.firebaseapp.com",
  projectId: "alien-paratext-321411",
  storageBucket: "alien-paratext-321411.appspot.com",
  messagingSenderId: "507392617835",
  appId: "1:507392617835:web:b84efd9d78f0d63f4d302e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
