import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import colors from '../theme/colors';
import HorizontalMovieCard from './HorizontalMovieCard';

const { width } = Dimensions.get('window');

export default function HorizontalMovieList({ title, movies }) {
    const scrollX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x
    });

    return (
        <View style={styles.container}>
            {title !== '' && <Text style={styles.title}>{title}</Text>}
            <Animated.FlatList
                data={movies}
                renderItem={({ item, index }) => (
                    <HorizontalMovieCard movie={item} index={index} scrollX={scrollX} />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                onScroll={scrollHandler}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    title: {
        color: colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        paddingHorizontal: 16,
    },
    list: {
        paddingLeft: 16,
    },
});