import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Alert, View, TouchableOpacity, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';

import useAuthStore from '../../state/authStore';
import colors from '../../theme/colors';
import LottieLoader from '../../utils/LottieLoader';
import KeyboardRefreshWrapper from '../../components/common/KeyboardRefreshWrapper';
import fonts from '../../theme/fonts';


export default function LoginScreen({ navigation }) {
    // Keep the email and password entered by the user
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

    // If login fails, show warning to user
    useEffect(() => {
        if (error) {
            Alert.alert('Email and Password do not match', 'Please enter the correct password');
        }
    }, [error]);


    return (
        <KeyboardRefreshWrapper>
            <StatusBar backgroundColor={colors.background} barStyle='light-content' />

            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>

                <LottieView
                    source={require('../../assets/animations/login.json')}
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
        </KeyboardRefreshWrapper>
    );
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
        fontSize: fonts.sectionTitle,
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
