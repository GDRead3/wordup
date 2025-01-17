import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
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

      // Check if the game is lost
      if (newLives <= 0 && prev.mode !== 'casual') {
        setTimeout(onGameOver, 1000);
        return {
          ...prev,
          guessedLetters: newGuessedLetters,
          remainingLives: newLives,
          score: newScore,
          gameStatus: 'lost'
        };
      }

      return {
        ...prev,
        guessedLetters: newGuessedLetters,
        remainingLives: newLives,
        score: newScore,
        gameStatus: 'playing'
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
          remainingLives: prev.mode === 'marathon' ? 6 : prev.remainingLives
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
            <Text style={baseStyles.word}>{displayWord()}</Text>
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