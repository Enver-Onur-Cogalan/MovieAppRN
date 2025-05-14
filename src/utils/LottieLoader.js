import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

const animations = {
    loading: require('../assets/animations/loading.json'),
};


export default function LottieLoader({ animation = 'loading', size = 150 }) {
    return (
        <View style={styles.container}>
            <LottieView
                source={animations[animation]}
                autoPlay
                loop
                style={{ width: size, height: size }}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});