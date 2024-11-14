// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw11C7jVVnth3Wmj4csVEHADa8sSB-RTQ",
  authDomain: "email-password-auth-7df0d.firebaseapp.com",
  projectId: "email-password-auth-7df0d",
  storageBucket: "email-password-auth-7df0d.firebasestorage.app",
  messagingSenderId: "737774418871",
  appId: "1:737774418871:web:ee8a383ba20e609efa0632"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);

