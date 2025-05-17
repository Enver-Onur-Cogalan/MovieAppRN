import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../theme/colors';
import useAuthStore from '../../state/authStore';
import ConfirmDeleteModal from '../../components/modal/ConfirmDeleteModal';
import fonts from '../../theme/fonts';

export default function ProfileScreen() {
    const { logout, deleteAccount, user } = useAuthStore();

    // Modal visibility for account deletion confirmation
    const [confirmVisible, setConfirmVisible] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const handleDelete = (password) => {
        console.log('💣 Deleting with password:', password);
        console.log('👤 User:', user);
        deleteAccount(user?.email, password)
        setConfirmVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.background} barStyle='light-content' />
            <LottieView
                source={require('../../assets/animations/profile.json')}
                autoPlay
                loop
                style={styles.lottie}
            />

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Icon name='logout' size={20} color={colors.text} style={styles.icon} />
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={() => setConfirmVisible(true)}>
                <Icon name='delete-forever' size={20} color={'#aaa'} style={styles.icon} />
                <Text style={styles.deleteText}>Delete Account</Text>
            </TouchableOpacity>

            <ConfirmDeleteModal
                visible={confirmVisible}
                onClose={() => setConfirmVisible(false)}
                onConfirm={handleDelete}
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    lottie: {
        width: 200,
        height: 200,
        marginBottom: 32,
    },
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginBottom: 12,
    },
    logoutText: {
        color: colors.text,
        fontWeight: 'bold',
        fontSize: fonts.body,
    },
    deleteText: {
        color: '#aaa',
        fontSize: fonts.body,
        textDecorationLine: 'underline',
    },
    icon: {
        marginRight: 8,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
});