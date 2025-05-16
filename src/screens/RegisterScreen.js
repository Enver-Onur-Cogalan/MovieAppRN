import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

import useAuthStore from '../state/authStore';
import colors from '../theme/colors';
import LottieLoader from '../utils/LottieLoader';
import KeyboardRefreshWrapper from '../components/KeyboardRefreshWrapper';
import fonts from '../theme/fonts';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { register, isLoading, error } = useAuthStore();

    const navigation = useNavigation();

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert('Missing Information', 'Please enter your email and password.');
            return;
        }

        register(email, password);
    };

    useEffect(() => {
        if (error) {
            Alert.alert('Registration Error', error);
        }
    }, [error]);

    return (
        <KeyboardRefreshWrapper>
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
                <LottieView
                    source={require('../assets/animations/register.json')}
                    autoPlay
                    loop
                    style={styles.lottie}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    placeholderTextColor='#aaa'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    placeholderTextColor='#aaa'
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {isLoading ? (
                    <LottieLoader animation='loading.json' size={150} />
                ) : (
                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.loginRow}>
                    <Text style={styles.loginText}>Do you already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardRefreshWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    title: {
        fontSize: fonts.title,
        marginBottom: 32,
        fontWeight: 'bold',
        color: colors.primary,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.inputBorder,
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        color: colors.text,
    },
    lottie: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 24,
        backgroundColor: colors.background,
    },
    registerButton: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginTop: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    registerButtonText: {
        color: colors.text,
        fontWeight: 'bold',
        fontSize: fonts.sectionTitle,
    },
    loginRow: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        color: '#aaa',
    },
    loginLink: {
        color: colors.primary,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});
