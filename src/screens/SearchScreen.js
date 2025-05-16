import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { searchMovies } from '../services/api';
import SearchFilterBar from '../components/SearchFilterBar';
import FilterModal from '../components/FilterModal';
import { getGenreIdByName } from '../utils/genreMap';
import MovieCard from '../components/MovieCard';
import LottieLoader from '../utils/LottieLoader';
import EmptyLottie from '../utils/EmptyLottie';
import KeyboardWrapper from '../components/KeyboardWrapper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);

    useEffect(() => {
        const delay = setTimeout(async () => {
            if (query.trim().length > 0 || selectedGenre || selectedRating) {
                try {
                    setLoading(true);
                    const data = await searchMovies(query || 'a');
                    setResults(data);
                } catch (e) {
                    console.error('Search error:', e);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [query, selectedGenre, selectedRating]);

    const filteredResults = results.filter((movie) => {
        const genreMatch = selectedGenre ? movie.genre_ids?.includes(getGenreIdByName(selectedGenre)) : true;
        const ratingMatch = selectedRating ? movie.vote_average >= parseInt(selectedRating) : true;
        return genreMatch && ratingMatch;
    });


    return (
        <KeyboardWrapper>
            <SafeAreaView style={{ flex: 1 }}>
                <SearchFilterBar
                    search={query}
                    setSearch={setQuery}
                    onFilterPress={() => setFilterVisible(true)}
                />

                {loading ? (
                    <LottieLoader />
                ) : (!query && !selectedGenre && !selectedRating) ? (

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <LottieView
                            source={require('../assets/animations/searchMovie.json')}
                            autoPlay
                            loop
                            style={{ width: 250, height: 250 }}
                        />
                        <Text style={{ color: '#aaa', marginTop: 12 }}>
                            Start searching or filter to explore movies!
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredResults}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <MovieCard movie={item} />}
                        contentContainerStyle={{ paddingBottom: 32 }}
                    />
                )}

                <FilterModal
                    visible={filterVisible}
                    onClose={() => setFilterVisible(false)}
                    onApply={() => setFilterVisible(false)}
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                    selectedRating={setSelectedRating}
                    setSelectedRating={setSelectedRating}
                />
            </SafeAreaView>
        </KeyboardWrapper>
    );
}

