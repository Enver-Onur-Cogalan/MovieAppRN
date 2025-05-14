import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import RootNavigator from './navigation/RootNavigator';
import useAuthStore from './state/authStore';


export default () => {
    const { user, setUser } = useAuthStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);



    return (
        <SafeAreaProvider>
            <RootNavigator />
        </SafeAreaProvider>
    );
}
