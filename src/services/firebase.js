import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBL280xE_bBbWBzAARuD-KI8H4YM6dklJ8",
    authDomain: "movieapp-a8f47.firebaseapp.com",
    projectId: "movieapp-a8f47",
    storageBucket: "movieapp-a8f47.firebasestorage.app",
    messagingSenderId: "341425074430",
    appId: "1:341425074430:web:80e9e5d4883332816d35af",
};

const app = initializeApp(firebaseConfig);
let _auth;
try {
    _auth = getAuth(app);
} catch (e) {
    console.warn("⚠️ auth component henüz hazır değil:", e);
}

export const auth = _auth;

export const db = getFirestore(app);


