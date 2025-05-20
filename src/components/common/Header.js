import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export default function Header({ title }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
    },
    title: {
        color: colors.text,
        fontSize: fonts.title,
        fontWeight: 'bold',
    },
});