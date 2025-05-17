import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Alert, BackHandler, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { fetchPopularMovies, getRandomMovies, fetchTopRatedMovies, fetchNowPlayingMovies } from '../../services/api';
import colors from '../../theme/colors';
import LottieLoader from '../../utils/LottieLoader';
import MovieCard from '../../components/movie/MovieCard';
import HorizontalMovieList from '../../components/movie/HorizontalMovieList';
import KeyboardRefreshWrapper from '../../components/common/KeyboardRefreshWrapper';
import { getUniqueRandomMovies } from '../../utils/movieHelpers';
import fonts from '../../theme/fonts';


export default function HomeScreen() {
    // Movie lists and loading status to be displayed on the screen
    const [allMovies, setAllMovies] = useState([]);
    const [randomMovies, setRandomMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Show a special exit warning when the back button is pressed on Android devices
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                Alert.alert(
                    'Do you want to exit the app? 😅',
                    'Or are you just checking something? 😂',
                    [
                        {
                            text: 'No',
                            style: 'cancel',
                        },
                        {
                            text: 'Yes',
                            onPress: () => {
                                Alert.alert(
                                    'Are you really sure?',
                                    'I am a student of Furkan teacher, we cannot make mistakes 😎',
                                    [
                                        {
                                            text: 'Back to app',
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'Ok king go ahead',
                                            onPress: () => { },
                                        },
                                    ]
                                );
                            },
                        },
                    ]
                );
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );


    // Get all movie data
    const loadMovies = async () => {
        try {
            setLoading(true);
            const popular = await fetchPopularMovies();
            const topRated = await fetchTopRatedMovies();
            const nowPlaying = await fetchNowPlayingMovies();

            const mixed = getUniqueRandomMovies([popular, topRated, nowPlaying], 5);

            setAllMovies(popular);
            setRandomMovies(getRandomMovies(mixed));
        } catch (err) {
            console.error('Failed to retrieve movie data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Load movie data on first render
    useEffect(() => {
        loadMovies();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <KeyboardRefreshWrapper refreshing={loading} onRefresh={loadMovies}>
                <StatusBar backgroundColor={colors.background} barStyle='light-content' />
                {loading ? (
                    <LottieLoader animation='loading' size={150} />
                ) : (
                    <>
                        <View style={styles.sectionHeader}>
                            <Icon name='thumb-up' size={24} color={colors.text} />
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
            </KeyboardRefreshWrapper>
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
        fontSize: fonts.subtitle,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    list: {
        paddingHorizontal: 8,
        paddingBottom: 32,
    },
});