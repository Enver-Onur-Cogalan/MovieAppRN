import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Registration process
export const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

// Login process
export const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

// Exit process
export const logoutUser = () => signOut(auth);

// Automatic login control
export const observeAuthState = (callback) => {
    return onAuthStateChanged(auth, callback);
};