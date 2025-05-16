import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import colors from '../theme/colors';
import fonts from '../theme/fonts';

const CARD_WIDTH = 350;

export default function HorizontalMovieCard({ movie, index, scrollX }) {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Detail', { movie });
    };

    const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH
    ];

    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(scrollX.value, inputRange, [0.7, 1, 0.7], Extrapolate.CLAMP);
        const opacity = interpolate(scrollX.value, inputRange, [0.6, 1, 0.6], Extrapolate.CLAMP);
        return {
            transform: [{ scale }],
            opacity,
        };
    });

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <Animated.View style={[styles.card, animatedStyle]}>
                <ImageBackground
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                    style={styles.image}
                    imageStyle={{ borderRadius: 12, resizeMode: 'stretch' }}
                >
                    <View style={styles.overlay}>
                        <Text style={styles.title} numberOfLines={1}>
                            {movie.title}
                        </Text>
                    </View>
                </ImageBackground>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: 300,
        marginRight: 12,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 8,
    },
    title: {
        color: colors.text,
        fontSize: fonts.small,
        fontWeight: 'bold',
    },
});