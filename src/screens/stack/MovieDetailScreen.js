import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';


import { fetchMovieCredits } from '../../services/api';
import { getGenreNameById } from '../../utils/genreMap';
import colors from '../../theme/colors';
import CastCard from '../../components/movie/CastCard';
import useAuthStore from '../../state/authStore';
import useFavoriteStore from '../../state/favoriteStore';
import fonts from '../../theme/fonts';
import GoBackButton from '../../components/common/GoBackButton';
import Header from '../../components/common/Header';

const { width, height } = Dimensions.get('window');

export default function MovieDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { movie } = route.params; // Get the selected movie as parameter

    const [cast, setCast] = useState([]);

    const { toggleFavorite, isFavorite, loadFavorites, } = useFavoriteStore();
    const user = useAuthStore((state) => state.user);

    // When the screen is loaded, bring up the favorite movies
    useEffect(() => {
        if (user) {
            loadFavorites(user.id);
        }
    }, []);


    // Get movie cast from API
    useEffect(() => {
        const loadCredits = async () => {
            const castData = await fetchMovieCredits(movie.id);
            setCast(castData);
        };
        loadCredits();
    }, []);

    function getFirstGenreName(movie) {
        if (movie.genre_ids?.length > 0) {
            return getGenreNameById(movie.genre_ids[0]);
        }
        if (movie.genres?.length > 0) {
            return movie.genres[0].name;
        }
        return 'Unknown';
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar backgroundColor={colors.background} barStyle='light-content' />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{movie.title}</Text>
            </View>
            <GoBackButton />
            <ScrollView style={styles.container}>
                <View>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                        style={styles.poster}
                    />
                </View>

                {/* Genre + Favorite button + Points / Year information */}
                <View style={styles.infoRow}>
                    <Text style={styles.genreChip}>
                        {getFirstGenreName(movie)}
                    </Text>

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

                {/* Movie name and description */}
                <View style={styles.content}>
                    <View style={styles.descriptionContainer}>
                        <Icon name='auto-stories' size={24} color='#aaa' />
                        <Text style={styles.description}>
                            {movie.overview || 'No description available.'}
                        </Text>
                    </View>
                </View>

                {/* If there is a cast, show it as a horizontal scroll */}
                {cast.length > 0 && (
                    <View style={{ marginVertical: 16 }}>
                        <Text style={styles.castTitle}>Cast</Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {cast.map((actor, index) => (
                                <CastCard
                                    key={`${actor.id}-${index}`}
                                    actor={actor}
                                    onPress={() => navigation.navigate('ActorDetail', { actorId: actor.id })}
                                />
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
    titleContainer: {
        paddingTop: 12,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.primary
    },
    poster: {
        width,
        height: height * 0.6,
        resizeMode: 'contain',
    },
    title: {
        fontSize: fonts.title,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        fontSize: fonts.body,
        color: colors.textSecondary || '#aaa',
    },
    content: {
        padding: 16,
    },
    castTitle: {
        fontSize: fonts.title,
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
    genreChip: {
        fontSize: fonts.body,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.primary,
        paddingVertical: 4,
        paddingHorizontal: 12,
        fontWeight: 'bold',
        borderRadius: 16,
        overflow: 'hidden',
        marginRight: 'auto',
        marginLeft: 16,
    },
    infoText: {
        fontSize: fonts.body,
        fontWeight: '500',
        color: colors.text,
    },
    descriptionContainer: {
        borderWidth: 1,
        borderColor: colors.primary,
        padding: 20
    },
    header: {
        position: 'absolute',
        top: 50,
        left: 16,
        zIndex: 100,
        borderRadius: 8,
        padding: 6,
        backgroundColor: colors.background,
    },
});