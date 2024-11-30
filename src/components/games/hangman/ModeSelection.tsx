import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Card, Button, Text } from 'react-native-paper';
import { GameMode, ModeOption } from '../../../types/games/hangman';
import { GAME_MODES } from '../../../constants/gameConfig';

interface ModeSelectionProps {
  selectedMode: GameMode | null;
  onModeSelect: (mode: GameMode) => void;
  onStartGame: () => void;
}

export default function ModeSelection({ 
  selectedMode, 
  onModeSelect, 
  onStartGame 
}: ModeSelectionProps) {
  return (
    <ScrollView>
      <Title style={styles.title}>Choose Hangman Game Mode</Title>
      <View style={styles.modesContainer}>
        {GAME_MODES.map((mode) => (
          <Card 
            key={mode.id} 
            style={[
              styles.modeCard,
              selectedMode === mode.id && styles.selectedModeCard
            ]}
          >
            <Card.Content>
              <Title style={styles.modeCardTitle}>{mode.name}</Title>
              <Text style={styles.modeCardText}>{mode.description}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode={selectedMode === mode.id ? "contained" : "outlined"}
                onPress={() => onModeSelect(mode.id)}
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
        onPress={onStartGame}
        style={styles.startButton}
      >
        Start Game
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#f0f8ff',
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  modeCardTitle: {
    color: '#000000',
  },
  modeCardText: {
    color: '#666666',
  },
  selectButton: {
    marginVertical: 8,
  },
  startButton: {
    marginVertical: 20,
    marginHorizontal: 16,
    padding: 8,
  },
});