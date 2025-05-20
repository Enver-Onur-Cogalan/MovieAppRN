import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StatusBar, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { searchMovies } from '../../services/api';
import SearchFilterBar from '../../components/common/SearchFilterBar';
import FilterModal from '../../components/modal/FilterModal';
import { getGenreIdByName } from '../../utils/genreMap';
import MovieCard from '../../components/movie/MovieCard';
import LottieLoader from '../../utils/LottieLoader';
import { SafeAreaView } from 'react-native-safe-area-context';
import KeyboardRefreshWrapper from '../../components/common/KeyboardRefreshWrapper';
import colors from '../../theme/colors';

const { height: windowHeight } = Dimensions.get('window');

export default function SearchScreen() {
    // Search query, results and filter conditions
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);

    // Pagination and state management
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Reset page when filters/search change
    useEffect(() => {
        setPage(1);
        setResults([]);
        setHasMore(true);
    }, [query, selectedGenre, selectedRating]);

    // Automatically capture movie data when search or filter changes
    useEffect(() => {
        const delay = setTimeout(async () => {
            if (query.trim().length > 0 || selectedGenre || selectedRating) {
                try {
                    setLoading(true);

                    const { results: data, totalPages: total, currentPage: fromApiPage } = await searchMovies(query || 'a', page);
                    setCurrentPage(fromApiPage);
                    setTotalPages(total);
                    setHasMore(fromApiPage < total);

                    if (page === 1) {
                        setResults(data);
                    } else {
                        setResults(prev => [...prev, ...data]);
                    }
                } catch (e) {
                    console.error('Search error:', e);
                } finally {
                    setLoading(false);
                    setIsFetchingMore(false);
                }
            } else {
                setResults([]);
            }
        }, 800);

        return () => clearTimeout(delay);
    }, [query, selectedGenre, selectedRating, page]);

    // When the end of the scroll is reached, bring a new page
    const handleEndReached = () => {
        if (hasMore && !loading && !isFetchingMore) {
            setIsFetchingMore(true);
            setPage((prev) => prev + 1);
        }
    };

    // MovieCard rendered according to filter
    const renderMovie = ({ item }) => {
        const genreMatch = selectedGenre ? item.genre_ids?.includes(getGenreIdByName(selectedGenre)) : true;
        const ratingMatch = selectedRating ? item.vote_average >= parseInt(selectedRating) : true;

        if (!genreMatch || !ratingMatch) return null;

        return <MovieCard movie={item} />
    }


    return (
        <KeyboardRefreshWrapper>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor={colors.background} barStyle='light-content' />
                <SearchFilterBar
                    search={query}
                    setSearch={setQuery}
                    onFilterPress={() => setFilterVisible(true)}
                />

                {loading && page === 1 ? (
                    <LottieLoader />
                ) : (!query && !selectedGenre && !selectedRating) ? (

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <LottieView
                            source={require('../../assets/animations/searchMovie.json')}
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
                        data={results}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderMovie}
                        contentContainerStyle={{ paddingBottom: 32, minHeight: windowHeight + 100 }}
                        onEndReached={handleEndReached}
                        onEndReachedThreshold={0.3}
                        ListFooterComponent={isFetchingMore ? <LottieLoader /> : null}
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
        </KeyboardRefreshWrapper>
    );
}

