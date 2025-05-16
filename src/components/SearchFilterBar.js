import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../theme/colors';

export default function SearchFilterBar({ search, setSearch, onFilterPress }) {
    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <Icon name='search' size={20} color='#aaa' />
                <TextInput
                    placeholder='Search movies...'
                    placeholderTextColor='#aaa'
                    value={search}
                    onChangeText={setSearch}
                    style={styles.input}
                />
            </View>

            <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
                <Icon name='filter-list' size={20} color='#aaa' />
                <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        padding: 16,
    },
    searchBox: {
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        color: colors.text,
        marginLeft: 8,
        borderWidth: 1,
        borderColor: colors.inputBorder,
    },
    filterButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    filterText: {
        color: '#aaa',
        marginLeft: 4,
        fontWeight: '500',
    },
});