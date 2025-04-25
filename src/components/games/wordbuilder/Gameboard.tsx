/**
 * Word Builder Game Board Component
 * Main component that handles the word building game interface and logic.
 * Players are given root letters and must create valid words within a time limit.
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, TextInput, Portal, Dialog } from 'react-native-paper';
import { WordBuilderState, WordBuilderMode } from '../../../types/games/wordbuilder';
import { baseStyles } from '../../../styles';
import { WordBuilderService } from '../../../services/wordBuilderService';

interface GameBoardProps {
  gameState: WordBuilderState;
  setGameState: React.Dispatch<React.SetStateAction<WordBuilderState | null>>;
  onGameOver: () => void;
}

export default function GameBoard({ gameState, setGameState, onGameOver }: GameBoardProps) {
  const [inputWord, setInputWord] = useState('');
  const [showInvalidDialog, setShowInvalidDialog] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState('');

  // Timer effect
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (!prev) return prev;
        if (prev.timeRemaining <= 1) {
          clearInterval(timer);
          onGameOver();
          return { ...prev, timeRemaining: 0, gameStatus: 'finished' };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.gameStatus]);

  const handleWordSubmit = async () => {
    if (!inputWord.trim()) return;

    const word = inputWord.trim().toLowerCase();
    
    // Check if word is already found
    if (gameState.foundWords.has(word)) {
      setInvalidMessage('You already found this word!');
      setShowInvalidDialog(true);
      setInputWord('');
      return;
    }

    // Validate word
    const isValid = await wordBuilderService.validateWord(
      word,
      gameState.rootLetters,
      gameState.letterPosition
    );

    if (isValid) {
      const score = wordBuilderService.calculateWordScore(word);
      setGameState(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          foundWords: new Set([...prev.foundWords, word]),
          score: prev.score + score
        };
      });
      setInputWord('');
    } else {
      setInvalidMessage('Not a valid word or does not contain the required letters!');
      setShowInvalidDialog(true);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Card style={baseStyles.card}>
        <Card.Content>
          <View style={baseStyles.gameHeader}>
            <Text style={baseStyles.subtitle}>
              Time: {formatTime(gameState.timeRemaining)}
            </Text>
            <Text style={baseStyles.subtitle}>
              Score: {gameState.score}
            </Text>
            <Text style={baseStyles.subtitle}>
              Words: {gameState.foundWords.size}
            </Text>
          </View>

          <View style={styles.rootLettersContainer}>
            <Text style={styles.rootLettersLabel}>Use these letters:</Text>
            <Text style={styles.rootLetters}>{gameState.rootLetters.toUpperCase()}</Text>
            <Text style={styles.positionHint}>
              {gameState.letterPosition === 'start' ? 'At the start' :
               gameState.letterPosition === 'end' ? 'At the end' :
               gameState.letterPosition === 'middle' ? 'In the middle' :
               'Anywhere in the word'}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              value={inputWord}
              onChangeText={setInputWord}
              placeholder="Enter a word..."
              onSubmitEditing={handleWordSubmit}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={handleWordSubmit}
              style={styles.submitButton}
            >
              Submit
            </Button>
          </View>

          <ScrollView style={styles.wordList}>
            {Array.from(gameState.foundWords).map((word, index) => (
              <Text key={index} style={styles.wordItem}>
                {word}
              </Text>
            ))}
          </ScrollView>
        </Card.Content>
      </Card>

      <Portal>
        <Dialog visible={showInvalidDialog} onDismiss={() => setShowInvalidDialog(false)}>
          <Dialog.Title>Invalid Word</Dialog.Title>
          <Dialog.Content>
            <Text>{invalidMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowInvalidDialog(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  rootLettersContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  rootLettersLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  rootLetters: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3A86FF',
  },
  positionHint: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: '#09E85E',
  },
  wordList: {
    maxHeight: 200,
    marginTop: 16,
  },
  wordItem: {
    fontSize: 16,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
