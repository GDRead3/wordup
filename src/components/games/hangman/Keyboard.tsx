import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { ALPHABET } from '../../../constants/gameConfig';
import { baseStyles } from '../../../styles';

interface KeyboardProps {
  guessedLetters: Set<string>;
  onLetterPress: (letter: string) => void;
}

export default function Keyboard({ guessedLetters, onLetterPress }: KeyboardProps) {
  return (
    <View>
      <View style={baseStyles.keyboardContainer}>
        {ALPHABET.map((letter) => (
          <Chip
            key={letter}
            onPress={() => onLetterPress(letter)}
            style={[baseStyles.letterChip, styles.letter]}
            disabled={guessedLetters.has(letter)}
            mode="outlined"
          >
            {letter}
          </Chip>
        ))}
      </View>
      <View style={styles.guessedContainer}>
        <Chip style={styles.guessedChip}>
          Guessed: {Array.from(guessedLetters).join(' ')}
        </Chip>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  letter: {
    minWidth: 40,
    justifyContent: 'center',
  },
  guessedContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  guessedChip: {
    backgroundColor: '#f0f0f0',
  },
});