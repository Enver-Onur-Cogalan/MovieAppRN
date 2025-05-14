import { create } from "zustand";
import { loginUser, registerUser, logoutUser } from "../services/auth";

const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user }),

    // Login
    login: async (email, password) => {
        try {
            set({ isLoading: true, error: null });
            const userCredential = await loginUser(email, password);
            set({ user: userCredential.user });
        } catch (err) {
            set({ error: err.message })
        } finally {
            set({ isLoading: false });
        }
    },

    // Register
    register: async (email, password) => {
        try {
            set({ isLoading: true, error: null });
            const userCredential = await registerUser(email, password);
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
}));

export default useAuthStore;










