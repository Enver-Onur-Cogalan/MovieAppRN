import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './navigation/RootNavigator';
import { LogBox } from 'react-native';



export default () => {

    LogBox.ignoreLogs([
        'VirtualizedLists should never be nested inside plain ScrollViews',
    ]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <RootNavigator />
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
