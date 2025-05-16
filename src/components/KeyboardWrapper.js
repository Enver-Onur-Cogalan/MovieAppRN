import React from 'react';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, View } from 'react-native'
import colors from '../theme/colors';

export default function KeyboardWrapper({ children }) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: colors.background }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled'
                    showsHorizontalScrollIndicator={false}
                >
                    {children}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
