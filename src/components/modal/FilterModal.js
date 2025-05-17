import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Animation'];
const ratings = ['9+', '8+', '7+', '6+', '5+'];

export default function FilterModal({ visible, onClose, onApply, selectedGenre, setSelectedGenre, selectedRating, setSelectedRating }) {
    return (
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Filter Movies</Text>

                    {/* Type selection */}
                    <Text style={styles.label}>Genre</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
                        {genres.map((genre) => (
                            <TouchableOpacity
                                key={genre}
                                style={[styles.chip, selectedGenre === genre && styles.selected]}
                                onPress={() => setSelectedGenre(genre === selectedGenre ? null : genre)}
                            >
                                <Text style={styles.chipText}>{genre}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Point selection */}
                    <Text style={styles.label}>Rating</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
                        {ratings.map((rating) => (
                            <TouchableOpacity
                                key={rating}
                                style={[styles.chip, selectedRating === rating && styles.selected]}
                                onPress={() => selectedRating(rating === selectedRating ? null : rating)}
                            >
                                <Text style={styles.chipText}>{rating}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Buttons: Cancel, Apply, Reset */}
                    <View style={styles.actions}>
                        {/* Closes the modal */}
                        <TouchableOpacity onPress={onClose} style={styles.button}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>

                        {/* The modal is closed with the Apply button */}
                        <TouchableOpacity onPress={onApply} style={[styles.button, styles.apply]}>
                            <Text style={styles.buttonText}>Apply</Text>
                        </TouchableOpacity>

                        {/* Clears all filters and closes the modal */}
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedGenre(null);
                                setSelectedRating(null);
                                onClose();
                            }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Reset Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: colors.background,
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: fonts.subtitle,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 16,
    },
    label: {
        color: colors.text,
        marginTop: 12,
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    chip: {
        backgroundColor: '#333',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        marginRight: 8,
    },
    selected: {
        backgroundColor: colors.primary,
    },
    chipText: {
        color: '#aaa'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    buttonText: {
        color: '#aaa',
        fontWeight: '600',
    },
    apply: {
        backgroundColor: colors.primary,
        borderRadius: 10,
    },
});