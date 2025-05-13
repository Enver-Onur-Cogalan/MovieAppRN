import { create } from 'zustand';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    register: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                createdAt: serverTimestamp(),
            });

            set({ user });
            console.log("✅ Kullanıcı + Firestore başarıyla oluşturuldu:", user.uid);
        } catch (err) {
            console.error("❌ Register hatası:", err);
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            set({ user: res.user });
        } catch (err) {
            console.error("❌ Login hatası:", err);
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        await signOut(auth);
        set({ user: null });
    },

    initAuth: () => {
        console.log("✅ initAuth çağrıldı");
        onAuthStateChanged(auth, (user) => {
            console.log("🔥 onAuthStateChanged tetiklendi, user:", user);
            set({ user });
        });
    }
}));

export default useAuthStore;

