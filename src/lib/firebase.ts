// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVpT65prw-oYByhxkD8XucvIBOQsYLOS4",
  authDomain: "quickcap-2c243.firebaseapp.com",
  projectId: "quickcap-2c243",
  storageBucket: "quickcap-2c243.firebasestorage.app",
  messagingSenderId: "354798582634",
  appId: "1:354798582634:web:782a54aaa7470d2bdd4313",
  measurementId: "G-38P8J98BZP"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
const googleProvider = new GoogleAuthProvider();

export { app, auth, analytics, googleProvider };
