/* ==========================================================================
   GRAN GUITAR - Firebase & Cloud Firestore Client SDK
   ========================================================================== */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    updateDoc, 
    query, 
    orderBy, 
    limit, 
    serverTimestamp,
    onSnapshot 
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';

export const firebaseConfig = {
    projectId: "granguitar-web-app",
    appId: "1:153904868122:web:7b0d743750c7a4735d1aa3",
    storageBucket: "granguitar-web-app.firebasestorage.app",
    apiKey: "AIzaSyD0rfdiWmUFKqBb6yYGykbsLLrghwQeVXY",
    authDomain: "granguitar-web-app.firebaseapp.com",
    messagingSenderId: "153904868122"
};

let app = null;
let db = null;
let isFirestoreAvailable = false;

try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    isFirestoreAvailable = true;
    console.log("🔥 Firebase initialized successfully on project granguitar-web-app");
} catch (err) {
    console.warn("⚠️ Firebase initialization error:", err);
}

export { 
    app, 
    db, 
    isFirestoreAvailable, 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    updateDoc, 
    query, 
    orderBy, 
    limit, 
    serverTimestamp,
    onSnapshot 
};
