// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1IAAXHMDKhP8DXvNRt-WMoPO1efp87DM",
  authDomain: "watchdappimg.firebaseapp.com",
  projectId: "watchdappimg",
  storageBucket: "watchdappimg.appspot.com",
  messagingSenderId: "329446916399",
  appId: "1:329446916399:web:e6f3bc897221f3641821da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);