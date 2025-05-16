import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';


import { fetchMovieCredits } from '../services/api';
import colors from '../theme/colors';
import CastCard from '../components/CastCard';
import useAuthStore from '../state/authStore';
import useFavoriteStore from '../state/favoriteStore';

const { width, height } = Dimensions.get('window');

export default function MovieDetailScreen() {
    const route = useRoute();
    const { movie } = route.params;

    const [cast, setCast] = useState([]);

    const { toggleFavorite, isFavorite, loadFavorites, } = useFavoriteStore();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (user) {
            loadFavorites(user.id);
        }
    }, []);


    useEffect(() => {
        const loadCredits = async () => {
            const castData = await fetchMovieCredits(movie.id);
            setCast(castData);
        };
        loadCredits();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView style={styles.container}>
                <View>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                        style={styles.poster}
                    />
                </View>

                <View style={styles.infoRow}>
                    <Animatable.View
                        animation={isFavorite(movie.id) ? 'rubberBand' : undefined}
                        duration={500}
                        key={isFavorite(movie.id) ? 'liked' : 'unliked'} // re-trigger
                    >
                        <TouchableOpacity onPress={() => toggleFavorite(user?.id, movie)}>
                            <Icon
                                name={isFavorite(movie.id.toString()) ? 'favorite' : 'favorite-border'}
                                size={24}
                                color={colors.primary}
                            />
                        </TouchableOpacity>
                    </Animatable.View>

                    <Text style={styles.infoText}>
                        {movie.vote_average?.toFixed(1)} / {movie.release_date?.split('-')[0]}
                    </Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <View style={styles.descriptionContainer}>
                        <Icon name='auto-stories' size={24} color='#aaa' />
                        <Text style={styles.description}>
                            {movie.overview || 'No description available.'}
                        </Text>
                    </View>
                </View>

                {cast.length > 0 && (
                    <View style={{ marginVertical: 16 }}>
                        <Text style={styles.castTitle}>Cast</Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {cast.map((actor) => (
                                <CastCard key={actor.id} actor={actor} />
                            ))}
                        </ScrollView>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    poster: {
        width,
        height: height * 0.6,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.primary,
    },
    description: {
        fontSize: 16,
        color: colors.textSecondary || '#aaa',
    },
    content: {
        padding: 16,
    },
    castTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 8,
        marginLeft: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        gap: 8,
        justifyContent: 'flex-end',
        marginRight: 50,
    },
    infoText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.text,
    },
    descriptionContainer: {
        borderWidth: 1,
        borderColor: colors.primary,
        padding: 20
    }
});