import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchPopularMovies, getRandomMovies } from '../services/api';
import colors from '../theme/colors';
import LottieLoader from '../utils/LottieLoader';
import MovieCard from '../components/MovieCard';
import HorizontalMovieList from '../components/HorizontalMovieList';

export default function HomeScreen() {
    const [allMovies, setAllMovies] = useState([]);
    const [randomMovies, setRandomMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadMovies = async () => {
        try {
            setLoading(true);
            const data = await fetchPopularMovies();
            setAllMovies(data);
            setRandomMovies(getRandomMovies(data));
        } catch (err) {
            console.error('Failed to retrieve movie data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView style={styles.container}>
                {loading ? (
                    <LottieLoader animation='loading' size={150} />
                ) : (
                    <>
                        <View style={styles.sectionHeader}>
                            <Icon name='movie-filter' size={24} color={colors.text} />
                            <Text style={styles.sectionTitle}>Our Picks For You</Text>
                        </View>

                        <HorizontalMovieList
                            title=''
                            movies={randomMovies}
                        />

                        <View style={styles.sectionHeader}>
                            <Icon name='local-fire-department' size={24} color={colors.text} />
                            <Text style={styles.sectionTitle}>Popular Movies</Text>
                        </View>


                        <FlatList
                            data={allMovies}
                            renderItem={({ item, index }) => (
                                <MovieCard movie={item} index={index} />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                            contentContainerStyle={styles.list}
                            scrollEnabled={false}
                        />
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingVertical: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 8,
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    list: {
        paddingHorizontal: 8,
        paddingBottom: 32,
    },
});