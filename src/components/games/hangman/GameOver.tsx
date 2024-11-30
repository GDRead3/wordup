import React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, Button, Text } from 'react-native-paper';
import { colors } from '../../../styles';

interface GameOverDialogProps {
  visible: boolean;
  score: number;
  rounds: number;
  onDismiss: () => void;
}

export default function GameOverDialog({ 
  visible, 
  score, 
  rounds, 
  onDismiss 
}: GameOverDialogProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title style={styles.title}>Game Over!</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.score}>Final Score: {score}</Text>
          <Text style={styles.rounds}>Rounds Completed: {rounds}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss} mode="contained">
            Back to Menu
          </Button>
          {/* You can add more buttons here, like "Play Again" or "Save Score" */}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: colors.text.primary,
  },
  score: {
    fontSize: 18,
    marginVertical: 4,
    color: colors.text.secondary,
  },
  rounds: {
    fontSize: 18,
    marginVertical: 4,
    color: colors.text.secondary,
  },
});