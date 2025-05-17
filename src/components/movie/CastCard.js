import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';



export default function CastCard({ actor, index, onPress }) {


    return (
        <TouchableOpacity onPress={onPress}>
            <Animatable.View
                animation='fadeInLeftBig'
                delay={index * 100}
                duration={800}
                style={styles.card}
            >
                <Image
                    source={
                        actor.profile_path
                            ? { uri: `https://image.tmdb.org/t/p/w200${actor.profile_path}` }
                            : require('../../assets/placeholder.png')
                    }
                    style={styles.image}
                />
                <Text style={styles.name} numberOfLines={1}>{actor.name}</Text>
                <Text style={styles.character} numberOfLines={1}>{actor.character}</Text>
            </Animatable.View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    card: {
        width: 100,
        marginRight: 12,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 6,
    },
    name: {
        fontSize: fonts.tiny,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
    },
    character: {
        fontSize: fonts.tiny,
        color: colors.textSecondary || '#aaa',
        textAlign: 'center',
    },
});