import React, { useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';

import colors from '../theme/colors';
import fonts from '../theme/fonts';

export default function FavoriteMovieCard({ movie, onToggleFavorite }) {
    const navigation = useNavigation();
    const viewRef = useRef(null);

    const handlePress = () => {
        navigation.navigate('Detail', { movie });
    };

    const handleSwipeDelete = async () => {
        if (viewRef.current) {
            await viewRef.current.animate('fadeOutRight', 70);
        }
        onToggleFavorite();
    };

    const renderRightActions = () => {
        return (
            <View style={styles.deleteBox}>
                <Icon name='delete-forever' size={28} color={colors.primary} />
            </View>
        )
    }

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            onSwipeableRightOpen={handleSwipeDelete}
        >
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
        </Swipeable>
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
        fontSize: fonts.body,
        fontWeight: '600',
        color: colors.text,
        flex: 1,
        marginRight: 8,
    },
    year: {
        fontSize: fonts.small,
        color: '#aaa',
        marginTop: 4,
    },
    heart: {
        paddingHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteBox: {
        backgroundColor: 'crimson',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        marginVertical: 8,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
    },
});