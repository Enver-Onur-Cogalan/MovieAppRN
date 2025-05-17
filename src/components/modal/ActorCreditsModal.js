import React from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';

export default function ActorCreditsModal({ visible, onClose, credits = [] }) {
    const navigation = useNavigation();
    return (
        <Modal visible={visible} transparent animationType='slide'>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>All Movie</Text>
                    {/* Movie list */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {credits.map((movie) => (
                            <TouchableOpacity
                                key={movie.id}
                                onPress={() => {
                                    onClose();
                                    navigation.push('Detail', { movie });
                                }}
                                style={styles.item}
                            >
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w185${movie.poster_path}` }}
                                    style={styles.poster}
                                />
                                <View style={styles.textContainer}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon name='live-tv' size={16} color={colors.primary} style={{ marginRight: 6 }} />
                                        <Text style={styles.movieTitle} numberOfLines={2}>
                                            {movie.title}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Close button */}
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: colors.background,
        borderRadius: 16,
        padding: 16,
        width: '%90',
        maxHeight: '%80',
    },
    title: {
        fontSize: fonts.sectionTitle,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 12,
        textAlign: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    poster: {
        width: 60,
        height: 90,
        borderRadius: 8,
        marginRight: 12,
    },
    textContainer: {
        justifyContent: 'center',
    },
    movieTitle: {
        color: colors.text,
        fontSize: fonts.small,
        fontWeight: '600',
        textAlign: 'left',
    },
    closeButton: {
        marginTop: 16,
        alignSelf: 'center',
    },
    closeText: {
        color: colors.primary,
        fontWeight: 'bold',
    },
});