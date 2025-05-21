import React from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, RefreshControl } from 'react-native';

import colors from '../../theme/colors';

export default function KeyboardRefreshWrapper({
    children,
    refreshing,
    onRefresh,
    style
}) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[{ flex: 1, backgroundColor: colors.background }, style]}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled'
                    refreshControl={
                        refreshing !== undefined && onRefresh ? (
                            <RefreshControl
                                refreshing={!!refreshing}
                                onRefresh={onRefresh}
                                colors={[colors.primary]}
                                tintColor={colors.primary}
                            />
                        ) : null
                    }
                >
                    {children}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
