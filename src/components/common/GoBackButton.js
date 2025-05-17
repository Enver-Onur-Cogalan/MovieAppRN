import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import colors from '../../theme/colors';

export default function GoBackButton({ target = null, style }) {
    const navigation = useNavigation();

    const handlePress = () => {
        if (target) {
            navigation.navigate(target);
        } else {
            navigation.goBack();
        }
    };

    return (
        <Animatable.View
            animation='pulse'
            iterationCount={10}
            duration={800}
            style={[styles.wrapper, style]}
        >
            <TouchableOpacity onPress={handlePress}>
                <Icon name='arrow-back-ios' size={24} color={colors.text} />
            </TouchableOpacity>
        </Animatable.View>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        padding: 12,
    },
});