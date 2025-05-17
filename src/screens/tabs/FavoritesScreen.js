import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useFavoriteStore from '../../state/favoriteStore';
import useAuthStore from '../../state/authStore';
import FavoriteMovieCard from '../../components/movie/FavoriteMovieCard';
import colors from '../../theme/colors';
import SearchFilterBar from '../../components/common/SearchFilterBar';
import FilterModal from '../../components/modal/FilterModal';
import { getGenreIdByName } from '../../utils/genreMap';
import EmptyLottie from '../../utils/EmptyLottie';
import KeyboardRefreshWrapper from '../../components/common/KeyboardRefreshWrapper';
import fonts from '../../theme/fonts';

export default function FavoritesScreen() {
    const { favorites, loadFavorites, toggleFavorite } = useFavoriteStore();
    const user = useAuthStore((state) => state.user);

    // Local states for search, filtering and modal visibility
    const [search, setSearch] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);

    // Load favorites when user changes or logs in
    useEffect(() => {
        if (user?.id) {
            loadFavorites(user.id);
        }
    }, [user]);

    const renderItem = ({ item }) => (
        <FavoriteMovieCard
            movie={item}
            onToggleFavorite={() => toggleFavorite(user.id, item)}
        />
    );

    // Search, filtering by type and score
    const filteredResults = favorites.filter((movie) => {
        const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
        const matchesGenre = selectedGenre ? movie.genre_ids?.includes(getGenreIdByName(selectedGenre)) : true;
        const matchesRating = selectedRating ? movie.vote_average >= parseInt(selectedRating) : true;
        return matchesSearch && matchesGenre && matchesRating;
    });

    return (
        <KeyboardRefreshWrapper refreshing={false} onRefresh={() => loadFavorites(user.id)}>
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={colors.background} barStyle='light-content' />
                <Text style={styles.header}>Your Favorite Movies</Text>

                <SearchFilterBar
                    search={search}
                    setSearch={setSearch}
                    onFilterPress={() => setFilterVisible(true)}
                />

                <FilterModal
                    visible={filterVisible}
                    onClose={() => setFilterVisible(false)}
                    onApply={() => setFilterVisible(false)}
                    selectedGenre={selectedGenre}
                    selectedRating={setSelectedRating}
                    setSelectedGenre={setSelectedGenre}
                    setSelectedRating={setSelectedRating}
                />

                <FlatList
                    data={filteredResults}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={() => (
                        <EmptyLottie />
                    )}
                />
            </SafeAreaView>
        </KeyboardRefreshWrapper>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: fonts.title,
        fontWeight: 'bold',
        color: colors.text,
        marginTop: 16,
        marginBottom: 8,
        alignSelf: 'center',
    },
    listContent: {
        paddingBottom: 32,
    },
    empty: {
        color: '#aaa',
        textAlign: 'center',
        marginTop: 64,
        fontSize: fonts.body
    },
});