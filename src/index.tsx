import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';

export default () => {


    return (
        <SafeAreaProvider>
            <RootNavigator />
        </SafeAreaProvider>
    )
}
