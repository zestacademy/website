// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4oVV-8kEMxUaygYy7nRIJQE_BeUoJLTA",
    authDomain: "zest-academy.firebaseapp.com",
    projectId: "zest-academy",
    storageBucket: "zest-academy.firebasestorage.app",
    messagingSenderId: "181328077612",
    appId: "1:181328077612:web:32a090be58d4b157070289",
    measurementId: "G-TRQSQ7WDE0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Analytics (only on client side and if supported)
let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, analytics };
