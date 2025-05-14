import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, Alert, View, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

import useAuthStore from '../state/authStore';
import KeyboardWrapper from '../components/KeyboardWrapper';
import colors from '../theme/colors';


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, error, isLoading, } = useAuthStore();

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Missing Information", "Please enter your email and password.");
            return;
        }
        login(email, password);
    };

    useEffect(() => {
        if (error) {
            Alert.alert('Email and Password do not match', 'Please enter the correct password');
        }
    }, [error]);


    return (
        <KeyboardWrapper>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>

                <LottieView
                    source={require('../assets/animations/login.json')}
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
                    <ActivityIndicator size='large' color='#000' />
                ) : (
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.registerRow}>
                    <Text style={styles.registerText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerLink}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardWrapper>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
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
        marginBottom: 16,
    },
    loginButton: {
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
    loginButtonText: {
        color: colors.text,
        fontWeight: 'bold',
        fontSize: 17,
    },
    registerRow: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    registerText: {
        color: '#aaa',
    },
    registerLink: {
        color: colors.primary,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});
