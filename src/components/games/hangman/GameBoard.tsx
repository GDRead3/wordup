import React from 'react';
import { View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { GameState } from '../../../types/games/hangman';
import Keyboard from './Keyboard';
import { baseStyles } from '../../../styles';
import { checkGameStatus } from '../../../utils/games/hangman';

interface GameBoardProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
  onGameOver: () => void;
}

export default function GameBoard({ gameState, setGameState, onGameOver }: GameBoardProps) {
  const handleLetterPress = (letter: string) => {
    if (gameState.gameStatus !== 'playing') return;

    setGameState(prev => {
      if (!prev) return prev;

      const newGuessedLetters = new Set(prev.guessedLetters).add(letter);
      const isInWord = prev.currentWord.includes(letter);
      const newLives = isInWord ? prev.remainingLives : prev.remainingLives - 1;
      const newScore = isInWord ? prev.score + 10 : prev.score;
      
      const newStatus = checkGameStatus(prev.currentWord, newGuessedLetters, newLives);

      if (newStatus !== 'playing') {
        setTimeout(() => {
          if (newStatus === 'lost' || 
             (prev.maxRounds && prev.round >= prev.maxRounds)) {
            onGameOver();
          } else {
            // Handle next round
          }
        }, 1500);
      }

      return {
        ...prev,
        guessedLetters: newGuessedLetters,
        remainingLives: newLives,
        score: newScore,
        gameStatus: newStatus
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
            {gameState.maxRounds ? `/${gameState.maxRounds}` : ''}
          </Text>
          {gameState.mode !== 'casual' && (
            <Text style={baseStyles.subtitle}>Score: {gameState.score}</Text>
          )}
        </View>
        
        {/* End Game button for casual mode */}
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
  );
}