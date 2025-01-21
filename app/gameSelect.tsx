import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { baseStyles } from '../src/styles';

export default function GameSelectScreen() {
    return (
        <View style={baseStyles.container}>
            <Text>This will have the multiple games to choice from eventually</Text>
        </View>
    );
}