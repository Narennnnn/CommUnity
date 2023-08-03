// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAp91JIdvnxMJu-Piz5o2XrHo92pVbbXyc",
    authDomain: "socialmediaapp-e7eea.firebaseapp.com",
    projectId: "socialmediaapp-e7eea",
    storageBucket: "socialmediaapp-e7eea.appspot.com",
    messagingSenderId: "59288333276",
    appId: "1:59288333276:web:909230a63d199551087d19",
    measurementId: "G-07ZD0TLZ3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
