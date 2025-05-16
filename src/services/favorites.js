import { db } from './firebase';
import { collection, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';

export const addFavorite = async (userId, movie) => {
    if (!userId || !movie?.id) {
        console.warn('❌ addFavorite: Invalid userId or movie!');
        return;
    }

    try {
        const docRef = doc(db, 'users', userId, 'favorites', movie.id.toString());
        await setDoc(docRef, movie);
        console.log('✅ Added favorite:', movie.title);
    } catch (err) {
        console.error('❌ Error while adding favorite:', err);
    }
};

export const removeFavorite = async (userId, movieId) => {
    try {
        const docRef = doc(db, 'users', userId, 'favorites', movieId.toString());
        await deleteDoc(docRef);
        console.log('🗑️ Favorite deleted:', movieId)
    } catch (err) {
        console.error('❌ Error while deleting favorite:', err);
    }
};

export const getFavorites = async (userId) => {
    try {
        const snapshot = await getDocs(collection(db, 'users', userId, 'favorites'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('📥 Favorites loaded:', data.length)
        return data;
    } catch (err) {
        console.error('❌ Error while importing favorites:', err);
        return [];
    }
};