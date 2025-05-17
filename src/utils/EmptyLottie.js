import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

import colors from '../theme/colors';

export default function EmptyLottie({ message = 'Nothing here...', size = 200 }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>

            <LottieView
                source={require('../assets/animations/empty.json')}
                autoPlay
                loop
                style={{ width: size, height: size, backgroundColor: colors.background }}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    text: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 16,
    },
});