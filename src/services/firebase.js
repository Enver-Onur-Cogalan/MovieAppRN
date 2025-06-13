import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "XXX",
    authDomain: "XXX",
    projectId: "XXX",
    storageBucket: "XXX",
    messagingSenderId: "XXX",
    appId: "XXX"
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
