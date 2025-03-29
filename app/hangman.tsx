import React, { useState } from 'react';
import { View } from 'react-native';
import { Portal } from 'react-native-paper';
import GameBoard from '../src/components/games/hangman/GameBoard';
import GameOverDialog from '../src/components/games/hangman/GameOver';
import ModeSelection from '../src/components/games/hangman/ModeSelection';
import { GameState, GameMode } from '../src/types/games/hangman';
import { createInitialGameState } from '../src/utils/games/hangman';
import { saveHighScore } from '../src/utils/storage/scores';
import { baseStyles } from '../src/styles';

export default function PlayHangmanScreen() {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
  };

  const startNewGame = async () => {
    if (selectedMode) {
      try {
        const initialState = await createInitialGameState(selectedMode);
        setGameState(initialState);
      } catch (error) {
        console.error('Failed to start game:', error);
      }
    }
  };

  const handleGameOver = async () => {
    console.log('Game over triggered with mode:', selectedMode);
    console.log('Game state:', gameState);
    
    if (gameState && selectedMode && selectedMode !== 'casual') {
      console.log('Attempting to save score:', {
        game: 'Hangman',
        mode: selectedMode,
        score: gameState.score,
        date: new Date().toISOString().split('T')[0]
      });
      // Save score for non-casual modes
      await saveHighScore({
        game: 'Hangman',
        mode: selectedMode,
        score: gameState.score,
        date: new Date().toISOString().split('T')[0]
      });
      console.log('Score saved successfully');
    } else {
      console.log('Score not saved - conditions not met:', {
        hasGameState: !!gameState,
        selectedMode,
        isCasual: selectedMode === 'casual'
      });
    }
    setShowGameOver(true);
  };

  const resetGame = () => {
    setShowGameOver(false);
    setGameState(null);
    setSelectedMode(null);
  };

  return (
    <View style={baseStyles.container}>
      {!gameState ? (
        <ModeSelection
          selectedMode={selectedMode}
          onModeSelect={handleModeSelect}
          onStartGame={startNewGame}
        />
      ) : (
        <GameBoard
          gameState={gameState}
          setGameState={setGameState}
          onGameOver={handleGameOver}
        />
      )}

      <Portal>
        <GameOverDialog
          visible={showGameOver}
          score={gameState?.score ?? 0}
          rounds={gameState?.round ?? 0}
          word={gameState?.currentWord ?? ''}
          onDismiss={resetGame}
        />
      </Portal>
    </View>
  );
}