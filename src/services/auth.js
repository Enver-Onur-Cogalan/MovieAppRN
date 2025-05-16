import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth, db } from "./firebase";
import { deleteDoc, doc } from "firebase/firestore";

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

// Delete Account
export const deleteAccount = async (email, password) => {
    const user = auth.currentUser;

    console.log('📩 Email:', email, '| 🔐 Password:', password, '| 🧑 User:', user);

    if (!user || typeof email !== 'string' || !email.trim() || typeof password !== 'string' || !password.trim()) {
        console.warn('❌ Missing email or password or user.');
        throw new Error('Missing credentials');
    }

    if (user) {
        try {
            const credential = EmailAuthProvider.credential(email, password);
            await reauthenticateWithCredential(user, credential)


            await deleteDoc(doc(db, 'users', user.uid));

            await deleteUser(user);

            console.log('✅ User account deleted.');
        } catch (err) {
            console.error('❌ Error deleting account:', err);
            throw err;
        }
    } else {
        console.warn('No user found to delete');
    }
};