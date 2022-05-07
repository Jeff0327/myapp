import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAxCFg5ygfV3laKROyh0cxxp-3ilQmcOr0",
  authDomain: "react0501-2b10b.firebaseapp.com",
  projectId: "react0501-2b10b",
  storageBucket: "react0501-2b10b.appspot.com",
  messagingSenderId: "275366751495",
  appId: "1:275366751495:web:5ac2da234e6fe55a3ca9a2",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = getFirestore();
export const storageService = getStorage();
