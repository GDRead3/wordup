import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Dialog, Portal, Button, Text, ActivityIndicator } from 'react-native-paper';
import { colors } from '../../../styles';
import { wordService } from '@/src/services/wordService';

interface GameOverDialogProps {
  visible: boolean;
  score: number;
  rounds: number;
  word: string;
  onDismiss: () => void;
}

export default function GameOverDialog({ 
  visible, 
  score, 
  rounds, 
  word,
  onDismiss 
}: GameOverDialogProps) {
  const [definitions, setDefinitions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDefinition = async () => {
      if (visible) {
        setLoading(true);
        try {
          const defs = await wordService.getWordDefinition(word);
          setDefinitions(defs);
        } catch (error) {
          setDefinitions(['Unable to load definition']);
        }
        setLoading(false);
      }
    };

    fetchDefinition();
  }, [visible, word]);


  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title style={styles.title}>Game Over!</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.word}>Word: {word}</Text>
            <Text style={styles.score}>Final Score: {score}</Text>
            <Text style={styles.rounds}>Rounds Completed: {rounds}</Text>
            
            <Text style={styles.definitionTitle}>Definitions:</Text>
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              definitions.map((def, index) => (
                <Text key={index} style={styles.definition}>
                  {index + 1}. {def}
                </Text>
              ))
            )}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={onDismiss} mode="contained">
            Back to Menu
          </Button>
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