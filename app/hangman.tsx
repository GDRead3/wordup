// app/hangman.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Card, Button, Text, Chip } from 'react-native-paper';

interface HangmanWord {
  word: string;
  theme: string;
  hint: string;
}

interface GameState {
  currentWord: HangmanWord | null;
  guessedLetters: Set<string>;
  remainingLives: number;
  score: number;
  gameStatus: 'playing' | 'won' | 'lost';
}

export default function PlayHangmanScreen() {
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [gameState, setGameState] = useState<GameState>({
    currentWord: null,
    guessedLetters: new Set(),
    remainingLives: 6,
    score: 0,
    gameStatus: 'playing'
  });

  const themes: { id: string; name: string; }[] = [
    { id: 'animals', name: 'Animals' },
    { id: 'food', name: 'Food & Cooking' },
    { id: 'technology', name: 'Technology' },
    { id: 'nature', name: 'Nature' },
  ];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleLetterPress = (letter: string) => {
    // Implement letter guess logic here
    console.log('Letter pressed:', letter);
  };

  const startNewGame = (theme: string) => {
    // Implement new game logic here
    console.log('Starting new game with theme:', theme);
  };

  return (
    <View style={styles.container}>
      {!gameState.currentWord ? (
        // Theme Selection Screen
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Choose a Theme</Title>
            <View style={styles.themesContainer}>
              {themes.map((theme) => (
                <Button
                  key={theme.id}
                  mode={selectedTheme === theme.id ? "contained" : "outlined"}
                  onPress={() => setSelectedTheme(theme.id)}
                  style={styles.themeButton}
                >
                  {theme.name}
                </Button>
              ))}
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              disabled={!selectedTheme}
              onPress={() => startNewGame(selectedTheme)}
            >
              Start Game
            </Button>
          </Card.Actions>
        </Card>
      ) : (
        // Game Screen
        <View>
          <Card style={styles.gameCard}>
            <Card.Content>
              <Text style={styles.lives}>Lives: {'❤️'.repeat(gameState.remainingLives)}</Text>
              <Text style={styles.score}>Score: {gameState.score}</Text>
              
              <View style={styles.wordContainer}>
                {/* Word display placeholder */}
                <Text style={styles.word}>_ _ _ _ _</Text>
              </View>

              <View style={styles.keyboardContainer}>
                {alphabet.map((letter) => (
                  <Chip
                    key={letter}
                    onPress={() => handleLetterPress(letter)}
                    style={styles.letterChip}
                    disabled={gameState.guessedLetters.has(letter)}
                  >
                    {letter}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f6fa',
  },
  card: {
    marginVertical: 10,
  },
  gameCard: {
    margin: 8,
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 24,
  },
  themesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 20,
  },
  themeButton: {
    margin: 4,
  },
  lives: {
    fontSize: 18,
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    marginBottom: 20,
  },
  wordContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  word: {
    fontSize: 32,
    letterSpacing: 8,
  },
  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  letterChip: {
    margin: 2,
  },
});