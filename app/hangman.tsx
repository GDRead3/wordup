import React, { useState } from 'react';
import { View } from 'react-native';
import { Portal } from 'react-native-paper';
import ModeSelection from '../src/components/games/hangman/ModeSelection';
import GameBoard from '../src/components/games/hangman/GameBoard';
import GameOverDialog from '../src/components/games/hangman/GameOver';
import { GameState, GameMode } from '../src/types/games/hangman';
import { createInitialGameState } from '../src/utils/games/hangman';
import { baseStyles } from '../src/styles';

export default function PlayHangmanScreen() {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
  };

  const startNewGame = () => {
    if (selectedMode) {
      setGameState(createInitialGameState(selectedMode));
    }
  };

  const handleGameOver = () => {
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
          onDismiss={resetGame}
        />
      </Portal>
    </View>
  );
}