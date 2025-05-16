import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthStack from './AuthStack';
import MainNavigator from './MainNavigator';
import useAuthStore from '../state/authStore';
import colors from '../theme/colors';
import LottieLoader from '../utils/LottieLoader';

export default function RootNavigator() {
    const user = useAuthStore((state) => state.user);
    const isAuthReady = useAuthStore((state) => state.isAuthReady);
    const checkAuthState = useAuthStore((state) => state.checkAuthState);

    useEffect(() => {
        checkAuthState();
    }, []);

    if (!isAuthReady) {
        console.log('Checking auth status')
        return (
            <SafeAreaProvider>
                <View style={{ flex: 1, backgroundColor: colors.background }}>
                    <LottieLoader />
                </View>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {user ? <MainNavigator /> : <AuthStack />}
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
