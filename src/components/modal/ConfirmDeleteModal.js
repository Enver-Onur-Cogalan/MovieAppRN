import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export default function ConfirmDeleteModal({ visible, onClose, onConfirm }) {
    const [password, setPassword] = useState('');

    const handleDelete = () => {
        onConfirm(password);
        setPassword('');
    };

    const handleCancel = () => {
        setPassword('');
        onClose();
    };


    return (
        <Modal
            visible={visible}
            transparent
            animationType='slide'
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Confirm Account Deletion</Text>
                    <Text style={styles.description}>Please enter your password to confirm: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry
                        placeholderTextColor={'#aaa'}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancel} onPress={handleCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirm} onPress={handleDelete}>
                            <Text style={styles.confirmText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#0008',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '85%',
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 12,
        elevation: 6,
    },
    title: {
        fontSize: fonts.sectionTitle,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 10,
    },
    description: {
        color: colors.text,
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        color: colors.text,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    cancel: {
        padding: 10,
    },
    cancelText: {
        color: '#aaa',
    },
    confirm: {
        padding: 10,
        backgroundColor: '#ff5555',
        borderRadius: 6,
    },
    confirmText: {
        color: colors.text,
        fontWeight: 'bold',
    },
});