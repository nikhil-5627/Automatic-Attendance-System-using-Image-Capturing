// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzvUVTO7yFJJOBr0enLXSilp_slD3E4Mk",
  authDomain: "attendify-login-1a413.firebaseapp.com",
  projectId: "attendify-login-1a413",
  storageBucket: "attendify-login-1a413.firebasestorage.app",
  messagingSenderId: "569429524393",
  appId: "1:569429524393:web:a85640db44a26f680d8eb8",
  measurementId: "G-27T6G611N1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;