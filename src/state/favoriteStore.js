import { create } from "zustand";

import { addFavorite, removeFavorite, getFavorites } from "../services/favorites";

const useFavoriteStore = create((set, get) => ({
    favorites: [],
    isLoaded: false,

    loadFavorites: async (userId) => {
        try {
            const data = await getFavorites(userId);
            set({ favorites: data, isLoaded: true });
        } catch (err) {
            console.error('Error loading favorites:', err);
        }
    },

    toggleFavorite: async (userId, movie) => {
        const current = get().favorites;
        const exists = current.find((item) => item.id === movie.id);

        try {
            if (exists) {
                await removeFavorite(userId, movie.id);
                set({ favorites: current.filter((item) => item.id !== movie.id) });
            } else {
                await addFavorite(userId, movie);
                set({ favorites: [...current, movie] });
            }
        } catch (err) {
            console.error('Favorite toggle error:', err);
        }
    },

    isFavorite: (movieId) => {
        const favorites = get().favorites;
        if (!Array.isArray(favorites)) return false;
        return favorites.some((item) => item?.id?.toString() === movieId?.toString());
    },
}));

export default useFavoriteStore;