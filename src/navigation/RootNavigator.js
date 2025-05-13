import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import useAuthStore from '../state/authStore';

export default function RootNavigator() {
    const user = useAuthStore((state) => state.user);
    return (
        <NavigationContainer>
            {user ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
    );
}
