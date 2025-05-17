import { create } from "zustand";

import { loginUser, registerUser, logoutUser, observeAuthState } from "../services/auth";
import { deleteAccount as deleteAccountService } from "../services/auth";

const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,
    isAuthReady: false,

    setUser: (user) => set({ user }),

    // Login
    login: async (email, password) => {
        try {
            set({ isLoading: true, error: null });
            const userCredential = await loginUser(email, password);
            const { uid, email: userEmail } = userCredential.user;
            set({ user: { id: uid, email: userEmail } });
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ isLoading: false });
        }
    },

    // Register
    register: async (email, password) => {
        try {
            set({ isLoading: true, error: null });
            const userCredential = await registerUser(email, password);
            const { uid, email: userEmail } = userCredential.user;
            set({ user: { id: uid, email: userEmail } });
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ isLoading: false });
        }
    },

    // Logout
    logout: async () => {
        try {
            set({ isLoading: true });
            await logoutUser();
            set({ user: null });
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ isLoading: false });
        }
    },

    // Automatic login control
    checkAuthState: async () => {
        const unsubscribe = observeAuthState((user) => {
            if (user) {
                console.log('firebase account found', user.email);
                const { uid, email } = user;
                set({ user: { id: uid, email }, isAuthReady: true });
            } else {
                console.log('Session not found');
                set({ user: null, isAuthReady: true });
            }
        });
        return unsubscribe;
    },

    // Delete Account
    deleteAccount: async (email, password) => {
        try {
            set({ isLoading: true });
            await deleteAccountService(email, password);
            set({ user: null });
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useAuthStore;











