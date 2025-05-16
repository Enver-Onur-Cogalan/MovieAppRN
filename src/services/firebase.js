import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBL280xE_bBbWBzAARuD-KI8H4YM6dklJ8",
    authDomain: "movieapp-a8f47.firebaseapp.com",
    projectId: "movieapp-a8f47",
    storageBucket: "movieapp-a8f47.firebasestorage.app",
    messagingSenderId: "341425074430",
    appId: "1:341425074430:web:80e9e5d4883332816d35af"
};

let app;
let auth;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);

    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });

    console.log('✅ Firebase initialized + Auth with persistence');
} else {
    app = getApps()[0];
    auth = getAuth(app);
    console.log('ℹ️ Firebase already initialized, using existing instance');
}

const db = getFirestore(app);

export { app, auth, db };
