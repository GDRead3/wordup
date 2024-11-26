import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Card, Button, Text, Chip, Portal, Dialog } from 'react-native-paper';

// Types for game modes and states
type GameMode = 'quick' | 'marathon' | 'casual';

interface GameState {
  currentWord: string;
  guessedLetters: Set<string>;
  remainingLives: number;
  score: number;
  gameStatus: 'playing' | 'won' | 'lost';
  round: number;
  maxRounds: number | null;
  mode: GameMode | null;
}

// Sample word list (you can expand this)
const WORDS = [
  'REACT', 'TYPESCRIPT', 'JAVASCRIPT', 'PROGRAMMING', 'DEVELOPMENT',
  'COMPUTER', 'SOFTWARE', 'CODING', 'APPLICATION', 'MOBILE'
];

export default function PlayHangmanScreen() {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentWord: '',
    guessedLetters: new Set(),
    remainingLives: 6,
    score: 0,
    gameStatus: 'playing',
    round: 0,
    maxRounds: null,
    mode: null
  });
  const [showGameOver, setShowGameOver] = useState(false);

  const modes = [
    { id: 'quick' as GameMode, name: 'Quick Mode (10 Rounds)', description: '10 rounds, 6 lives' },
    { id: 'marathon' as GameMode, name: 'Marathon Mode', description: 'Unlimited rounds, 6 lives' },
    { id: 'casual' as GameMode, name: 'Casual Mode', description: 'Unlimited rounds, unlimited lives' }
  ];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const getNewWord = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
  };

  const startNewGame = (mode: GameMode) => {
    const newWord = getNewWord();
    const gameConfig = {
      quick: { lives: 6, maxRounds: 10 },
      marathon: { lives: 6, maxRounds: null },
      casual: { lives: Infinity, maxRounds: null }
    };

    setGameState({
      currentWord: newWord,
      guessedLetters: new Set(),
      remainingLives: gameConfig[mode].lives,
      score: 0,
      gameStatus: 'playing',
      round: 1,
      maxRounds: gameConfig[mode].maxRounds,
      mode: mode
    });
  };

  const nextRound = () => {
    const newWord = getNewWord();
    setGameState(prev => ({
      ...prev,
      currentWord: newWord,
      guessedLetters: new Set(),
      round: prev.round + 1,
      gameStatus: 'playing'
    }));
  };

  const handleLetterPress = (letter: string) => {
    if (gameState.gameStatus !== 'playing') return;

    setGameState(prev => {
      const newGuessedLetters = new Set(prev.guessedLetters).add(letter);
      const isInWord = prev.currentWord.includes(letter);
      const newLives = isInWord ? prev.remainingLives : prev.remainingLives - 1;
      const newScore = isInWord ? prev.score + 10 : prev.score;
      
      // Check if word is completed
      const isWordComplete = [...prev.currentWord].every(char => 
        newGuessedLetters.has(char)
      );

      let newGameStatus = prev.gameStatus;
      if (isWordComplete) {
        newGameStatus = 'won';
      } else if (newLives <= 0) {
        newGameStatus = 'lost';
      }

      if (newGameStatus !== 'playing') {
        setTimeout(() => {
          if (newGameStatus === 'lost' || 
             (prev.maxRounds && prev.round >= prev.maxRounds)) {
            setShowGameOver(true);
          } else {
            nextRound();
          }
        }, 1500);
      }

      return {
        ...prev,
        guessedLetters: newGuessedLetters,
        remainingLives: newLives,
        score: newScore,
        gameStatus: newGameStatus
      };
    });
  };

  const displayWord = () => {
    return gameState.currentWord
      .split('')
      .map(letter => gameState.guessedLetters.has(letter) ? letter : '_')
      .join(' ');
  };

  return (
    <View style={styles.container}>
      {!gameState.currentWord ? (
        // Mode Selection Screen
        <ScrollView>
          <Title style={styles.title}>Choose Hangman Game Mode</Title>
          <View style={styles.modesContainer}>
            {modes.map((mode) => (
              <Card 
                key={mode.id} 
                style={[
                  styles.modeCard,
                  selectedMode === mode.id && styles.selectedModeCard
                ]}
              >
                <Card.Content>
                  <Title>{mode.name}</Title>
                  <Text>{mode.description}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button
                    mode={selectedMode === mode.id ? "contained" : "outlined"}
                    onPress={() => setSelectedMode(mode.id)}
                    style={styles.selectButton}
                  >
                    {selectedMode === mode.id ? "Selected" : "Select"}
                  </Button>
                </Card.Actions>
              </Card>
            ))}
          </View>
          
          <Button
            mode="contained"
            disabled={!selectedMode}
            onPress={() => selectedMode && startNewGame(selectedMode)}
            style={styles.startButton}
          >
            Start Game
          </Button>
        </ScrollView>
      ) : (
        // Game Screen
        <View>
          <Card style={styles.gameCard}>
            <Card.Content>
              <View style={styles.gameHeader}>
                <Text style={styles.lives}>
                  Lives: {gameState.mode !== 'casual' 
                    ? '❤️'.repeat(Math.min(gameState.remainingLives, 10)) 
                    : '∞'}
                </Text>
                <Text style={styles.round}>
                  Round: {gameState.round}
                  {gameState.maxRounds ? `/${gameState.maxRounds}` : ''}
                </Text>
                {gameState.mode !== 'casual' && (
                  <Text style={styles.score}>Score: {gameState.score}</Text>
                )}
              </View>
              
              <View style={styles.wordContainer}>
                <Text style={styles.word}>{displayWord()}</Text>
              </View>

              <View style={styles.guessedContainer}>
                <Text style={styles.guessedTitle}>Guessed Letters:</Text>
                <Text style={styles.guessedLetters}>
                  {[...gameState.guessedLetters].join(' ')}
                </Text>
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

      <Portal>
        <Dialog visible={showGameOver} onDismiss={() => setShowGameOver(false)}>
          <Dialog.Title>Game Over!</Dialog.Title>
          <Dialog.Content>
            <Text>Final Score: {gameState.score}</Text>
            <Text>Rounds Completed: {gameState.round}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
              setShowGameOver(false);
              setGameState(prev => ({
                ...prev,
                currentWord: '',
                mode: null
              }));
              setSelectedMode(null);
            }}>Back to Menu</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f6fa',
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 24,
  },
  modesContainer: {
    gap: 16,
    marginVertical: 20,
  },
  modeCard: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  selectedModeCard: {
    backgroundColor: '#f0f8ff', // Light blue background for selected card
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  selectButton: {
    marginVertical: 8,
  },
  startButton: {
    marginVertical: 20,
    marginHorizontal: 16,
    padding: 8,
  },
  gameCard: {
    margin: 8,
  },
  startButtonContainer: {
    justifyContent: 'center',
    marginTop: 10,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  lives: {
    fontSize: 18,
  },
  round: {
    fontSize: 18,
  },
  score: {
    fontSize: 18,
  },
  wordContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  word: {
    fontSize: 32,
    letterSpacing: 8,
    fontWeight: 'bold',
  },
  guessedContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  guessedTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  guessedLetters: {
    fontSize: 18,
    letterSpacing: 2,
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