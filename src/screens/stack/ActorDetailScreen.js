import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { fetchActorDetails, fetchActorCredits } from '../../services/api';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import GoBackButton from '../../components/common/GoBackButton';
import { calculateAge } from '../../utils/calculateAge';
import ActorCreditsModal from '../../components/modal/ActorCreditsModal';

export default function ActorDetailScreen() {
    const navigation = useNavigation();

    const route = useRoute();
    const { actorId } = route.params;

    //Actor information + loading status + Movies played by the actor + Modal showing all movies
    const [actor, setActor] = useState(null);
    const [loading, setLoading] = useState(null);
    const [knownFor, setKnownFor] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    // Get actor details and movie history
    useEffect(() => {
        const loadActor = async () => {
            try {
                const data = await fetchActorDetails(actorId);
                setActor(data);

                const credits = await fetchActorCredits(actorId);
                const validCredits = credits.filter((item) => item.poster_path);

                setKnownFor(validCredits);
            } catch (err) {
                console.error('Failed to load actor details:', err);
            } finally {
                setLoading(false);
            }
        };
        loadActor();
    }, []);

    // Loading phase
    if (loading) {
        return (
            <LottieLoader animation='loading' size={150} />
        );
    }
    if (!actor) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Actor not found.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar backgroundColor={colors.background} barStyle='light-content' />
            <GoBackButton />
            <ScrollView contentContainerStyle={styles.scroll}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}` }}
                    style={styles.image}
                    resizeMode='cover'
                />

                <Text style={styles.name}>{actor.name}</Text>

                {/* Place of birth */}
                {actor.place_of_birth && (
                    <View style={styles.infoRow}>
                        <Icon name='location-on' size={20} color='#aaa' />
                        <Text style={styles.infoText}>
                            {actor.place_of_birth}
                        </Text>
                    </View>
                )}

                {/* Age, year of birth, total movies */}
                <View style={styles.statsRow}>
                    {actor.birthday && (
                        <View style={styles.statItem}>
                            <Icon name='cake' size={24} color='#aaa' />
                            <Text style={styles.statText}>{calculateAge(actor.birthday)} yrs</Text>
                        </View>
                    )}
                    <View style={styles.statItem}>
                        <Icon name='calendar-today' size={24} color='#aaa' />
                        <Text style={styles.statText}>{actor.birthday?.split('-')[0] || 'N/A'}</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Icon name='video-library' size={24} color='#aaa' />
                        <Text style={styles.statText}>{knownFor.length} Movies</Text>
                    </View>
                </View>

                {/* Biography title */}
                <View style={styles.bioIconRow}>
                    <Icon name='library-books' size={20} color='#aaa' style={{ marginRight: 6, top: 5 }} />
                    <Text style={styles.bioTitle}>Biography</Text>
                </View>
                <View style={styles.bioContainer}>
                    <Icon name='auto-stories' size={24} color='#aaa' />
                    <Text style={styles.bioText}>
                        {actor.biography || 'Biograpghy no available.'}
                    </Text>
                </View>

                {/* "Show all movies" button */}
                {knownFor.length > 10 && (
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.showAllRow}>
                        <Icon name='keyboard-arrow-right' size={20} color={colors.primary} style={{ top: 5 }} />
                        <Text style={{ color: colors.text, marginTop: 8 }}>
                            Show all {knownFor.length} movies
                        </Text>
                        <Icon name='keyboard-arrow-left' size={20} color={colors.primary} style={{ top: 5 }} />
                    </TouchableOpacity>
                )}

                <ActorCreditsModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    credits={knownFor}
                />

                {knownFor.length > 0 && (
                    <View style={{ marginTop: 24, width: '100%' }}>
                        <View style={styles.movieIconRow}>
                            <Icon name='camera-roll' size={20} color='#aaa' style={{ marginRight: 6, bottom: 2 }} />
                            <Text style={styles.knownForTitle}>Known For</Text>
                        </View>

                        {/* Top 10 most popular movies */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {knownFor
                                .sort((a, b) => b.popularity - a.popularity)
                                .slice(0, 10)
                                .map((movie) => (
                                    <TouchableOpacity
                                        key={movie.id}
                                        style={styles.knownCard}
                                        onPress={() => navigation.navigate('Detail', { movie })}
                                    >
                                        <Image
                                            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                                            style={styles.knownPoster}
                                        />
                                        <Text style={styles.knownTitle} numberOfLines={1}>{movie.title}</Text>
                                    </TouchableOpacity>
                                ))}
                        </ScrollView>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: colors.error,
        fontSize: fonts.body,
    },
    container: {
        flex: 1,
    },
    scroll: {
        padding: 16,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 300,
        borderRadius: 12,
        marginBottom: 16,
    },
    name: {
        fontSize: fonts.title,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 8,
        textAlign: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    infoText: {
        marginLeft: 8,
        fontSize: fonts.small,
        color: '#aaa',
    },
    bioTitle: {
        fontSize: fonts.sectionTitle,
        fontWeight: 'bold',
        color: colors.text,
        marginTop: 16,
        marginBottom: 6,
        justifyContent: 'flex-start',
        width: '100%',
    },
    bioText: {
        fontSize: fonts.small,
        color: '#aaa',
        textAlign: 'justify',
    },
    knownForTitle: {
        fontSize: fonts.sectionTitle,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    knownCard: {
        marginRight: 12,
        alignItems: 'center',
        width: 120,
    },
    knownPoster: {
        width: 100,
        height: 150,
        borderRadius: 30,
        marginBottom: 6,
    },
    knownTitle: {
        fontSize: fonts.tiny,
        color: '#aaa',
        textAlign: 'center',
    },
    bioContainer: {
        borderWidth: 1,
        padding: 12,
        borderColor: colors.primary,
    },
    bioIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 6,
        alignSelf: 'flex-start',
    },
    movieIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginBottom: 16,
        width: '100%',
        paddingHorizontal: 12,
    },
    statItem: {
        alignItems: 'center',
    },
    statText: {
        fontSize: fonts.tiny,
        color: '#aaa',
        marginTop: 4,
    },
    showAllRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: 8,
        marginBottom: 12,
        gap: 4,
    }

});