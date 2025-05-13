import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCLely8r0vzK_N0cj7PAW59apROeOXvSgQ",
    authDomain: "movieapprn-f53f4.firebaseapp.com",
    projectId: "movieapprn-f53f4",
    storageBucket: "movieapprn-f53f4.firebasestorage.app",
    messagingSenderId: "763099459131",
    appId: "1:763099459131:web:434e2805033d59e1d9361e",
    measurementId: "G-L8N55GDNE5"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);