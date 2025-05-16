import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';


import colors from '../theme/colors';
import fonts from '../theme/fonts';



export default function MovieCard({ movie, index }) {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Detail', { movie });
    };

    return (
        <TouchableOpacity onPress={handlePress} style={{ flex: 1 }}>
            <Animatable.View animation='fadeInUp' delay={index * 100} style={styles.card}>
                <ImageBackground
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                    style={styles.image}
                    imageStyle={{ borderRadius: 12 }}
                >
                    <View style={styles.overlay}>
                        <Text style={styles.title} numberOfLines={1}>
                            {movie.title}
                        </Text>
                    </View>
                </ImageBackground>
            </Animatable.View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    image: {
        height: 250,
        justifyContent: 'flex-end',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
    },
    title: {
        color: colors.text,
        fontWeight: 'bold',
        fontSize: fonts.small,
    },
});