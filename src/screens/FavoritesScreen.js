import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useFavoriteStore from '../state/favoriteStore';
import useAuthStore from '../state/authStore';
import FavoriteMovieCard from '../components/FavoriteMovieCard';
import colors from '../theme/colors';
import SearchFilterBar from '../components/SearchFilterBar';
import KeyboardWrapper from '../components/KeyboardWrapper';
import FilterModal from '../components/FilterModal';
import { getGenreIdByName } from '../utils/genreMap';
import EmptyLottie from '../utils/EmptyLottie';

export default function FavoritesScreen() {
    const { favorites, loadFavorites, toggleFavorite } = useFavoriteStore();
    const user = useAuthStore((state) => state.user);

    const [search, setSearch] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);

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

    const filteredResults = favorites.filter((movie) => {
        const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
        const matchesGenre = selectedGenre ? movie.genre_ids?.includes(getGenreIdByName(selectedGenre)) : true;
        const matchesRating = selectedRating ? movie.vote_average >= parseInt(selectedRating) : true;
        return matchesSearch && matchesGenre && matchesRating;
    });

    return (
        <KeyboardWrapper>
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
        </KeyboardWrapper>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 28,
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
        fontSize: 16,
    },
});