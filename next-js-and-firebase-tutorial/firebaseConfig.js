// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAqrVKA0HGKlcd3AhLp9PsGx1E-uUFxd08",
    authDomain: "evernoteclone-50f36.firebaseapp.com",
    projectId: "evernoteclone-50f36",
    storageBucket: "evernoteclone-50f36.appspot.com",
    messagingSenderId: "1038208041546",
    appId: "1:1038208041546:web:223afb0230bdfa38ce5cb3",
    measurementId: "G-4HMBWVJWP1"
};
let analytics; let firestore;
if (firebaseConfig?.projectId) {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    if (app.name && typeof window !== 'undefined') {
        analytics = getAnalytics(app);
    }

    // Access Firebase services using shorthand notation
    firestore = getFirestore();
}


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)