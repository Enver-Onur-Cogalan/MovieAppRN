import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../theme/colors';

export default function FavoriteMovieCard({ movie, onToggleFavorite }) {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Detail', { movie });
    };

    return (
        <Animatable.View animation='fadeInUp' duration={800} style={styles.card}>
            <TouchableOpacity onPress={handlePress} style={styles.left}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                    style={styles.poster}
                />
            </TouchableOpacity>

            <View style={styles.right}>
                <View style={styles.topRow}>
                    <Text style={styles.title} numberOfLines={1}>
                        {movie.title}
                    </Text>

                    <TouchableOpacity onPress={onToggleFavorite} style={styles.heart}>
                        <Icon name='favorite' size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.year}>
                    {movie.release_date?.split('-')[0] || '----'}
                </Text>
            </View>
        </Animatable.View>
    );
}


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: colors.backgroundColor,
        borderRadius: 12,
        marginVertical: 8,
        overflow: 'hidden',
        elevation: 2,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    left: {
        width: 100,
        height: 150,
    },
    poster: {
        width: '100%',
        height: '100%',
    },
    right: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
        flex: 1,
        marginRight: 8,
    },
    year: {
        fontSize: 14,
        color: '#aaa',
        marginTop: 4,
    },
    heart: {
        paddingHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }
});