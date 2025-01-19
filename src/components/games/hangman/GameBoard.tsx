import React, { useState, useEffect } from 'react';
import { View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { GameState } from '../../../types/games/hangman';
import Keyboard from './Keyboard';
import SuccessDialog from './SuccessDialog';
import { baseStyles } from '../../../styles';
import { checkGameStatus } from '../../../utils/games/hangman';
import { wordService } from '../../../services/wordService';

interface GameBoardProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
  onGameOver: () => void;
}

export default function GameBoard({ gameState, setGameState, onGameOver }: GameBoardProps) {
  const [showSuccess, setShowSuccess] = useState(false);


  // function to calculate font size of word to prevent word from spilling over into a second line
  const calculateWordDisplay = () => {
    const screenWidth = Dimensions.get('window').width;
    const wordLength = gameState.currentWord.length;
    const horizontalPadding = 32

    let letterSpacing = 6;
    let fontSize = 32;
    
    const availableWidth = screenWidth - horizontalPadding; //calculates how much width is availalbe for the word to fit on

    // Calculate space needed with default values
      let totalWidth = (wordLength * fontSize) + ((wordLength - 1) * letterSpacing);

    // If word is too long, adjust both font size and spacing
     if (totalWidth > availableWidth) {
    // First reduce letter spacing for long words
    letterSpacing = Math.max(2, Math.floor(availableWidth / wordLength / 4));
    totalWidth = (wordLength * fontSize) + ((wordLength - 1) * letterSpacing);
    
    // If still too big, reduce font size
    if (totalWidth > availableWidth) {
      fontSize = Math.max(16, Math.floor((availableWidth - (wordLength - 1) * letterSpacing) / wordLength));
    }
  }

    return {fontSize, letterSpacing};

  };

  const { fontSize, letterSpacing } = calculateWordDisplay();

  // Check if the word is complete after each guess
  useEffect(() => {
    const isWordComplete = [...gameState.currentWord].every(letter => 
      gameState.guessedLetters.has(letter)
    );
    
    if (isWordComplete && gameState.gameStatus === 'playing') {
      setGameState(prev => prev ? { ...prev, gameStatus: 'won' } : prev);
      setShowSuccess(true);
    }
  }, [gameState.guessedLetters, gameState.currentWord]);

  const handleLetterPress = (letter: string) => {
    if (gameState.gameStatus !== 'playing') return;

    setGameState(prev => {
      if (!prev) return prev;

      const newGuessedLetters = new Set(prev.guessedLetters).add(letter);
      const isInWord = prev.currentWord.includes(letter);
      const newLives = isInWord ? prev.remainingLives : prev.remainingLives - 1;
      const newScore = isInWord ? prev.score + 10 : prev.score;

    // Check if word is complete after this guess
    const isWordComplete = [...prev.currentWord].every(char => 
      newGuessedLetters.has(char)
    );

    // Recalculate new display settings based on revealed letters
    const {fontSize, letterSpacing } = calculateWordDisplay();

      // Check if the game is lost
      if (newLives <= 0 && prev.mode !== 'casual') {
        setTimeout(onGameOver, 1000);
        return {
          ...prev,
          guessedLetters: newGuessedLetters,
          remainingLives: newLives,
          score: newScore,
          gameStatus: 'lost',
          displaySettings: { fontSize, letterSpacing }
        };
      }

      return {
        ...prev,
        guessedLetters: newGuessedLetters,
        remainingLives: newLives,
        score: newScore,
        gameStatus: 'playing',
        displaySettings: { fontSize, letterSpacing }
      };
    });
  };

  const handleNextRound = async () => {
    setShowSuccess(false);
    
    // Check if max rounds reached for quick mode
    if (gameState.mode === 'quick' && gameState.round >= 10) {
      onGameOver();
      return;
    }

    try {
      const newWord = await wordService.getRandomWord();
      setGameState(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          currentWord: newWord,
          guessedLetters: new Set(),
          gameStatus: 'playing',
          round: prev.round + 1,
          // Reset lives for marathon mode at the start of each round
          remainingLives: prev.mode === 'marathon' ? 10 : prev.remainingLives
        };
      });
    } catch (error) {
      console.error('Failed to fetch next word:', error);
      // Handle error - maybe show an error message to user
    }
  };

  const displayWord = () => {
    return gameState.currentWord
      .split('')
      .map(letter => gameState.guessedLetters.has(letter) ? letter : '_')
      .join(' ');
  };

  return (
    <>
      <Card style={baseStyles.card}>
        <Card.Content>
          <View style={baseStyles.gameHeader}>
            <Text style={baseStyles.subtitle}>
              Lives: {gameState.mode !== 'casual' 
                ? '❤️'.repeat(Math.min(gameState.remainingLives, 10)) 
                : '∞'}
            </Text>
            <Text style={baseStyles.subtitle}>
              Round: {gameState.round}
              {gameState.mode === 'quick' ? '/10' : ''}
            </Text>
            {gameState.mode !== 'casual' && (
              <Text style={baseStyles.subtitle}>Score: {gameState.score}</Text>
            )}
          </View>
          
          {gameState.mode === 'casual' && (
            <View style={baseStyles.buttonContainer}>
              <Button 
                mode="contained-tonal"
                onPress={onGameOver}
                style={baseStyles.button}
                icon="exit-to-app"
              >
                End Game
              </Button>
            </View>
          )}
          
          <View style={baseStyles.wordContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
              >
            <Text style={[
              baseStyles.word,
                {
                  fontSize: gameState.displaySettings?.fontSize ?? calculateWordDisplay().fontSize,
                  letterSpacing: gameState.displaySettings?.letterSpacing ?? calculateWordDisplay().letterSpacing
                }
                ]}>
                {displayWord()}
              </Text>
             </ScrollView>
          </View>

          <Keyboard
            guessedLetters={gameState.guessedLetters}
            onLetterPress={handleLetterPress}
          />
        </Card.Content>
      </Card>

      <SuccessDialog
        visible={showSuccess}
        word={gameState.currentWord}
        score={gameState.score}
        round={gameState.round}
        onNextRound={handleNextRound}
      />
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});