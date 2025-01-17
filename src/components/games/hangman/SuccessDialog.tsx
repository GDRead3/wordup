import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Dialog, Portal, Button, Text, ActivityIndicator } from 'react-native-paper';
import { colors } from '../../../styles';
import { wordService } from '../../../services/wordService';

interface SuccessDialogProps {
  visible: boolean;
  word: string;
  score: number;
  round: number;
  onNextRound: () => void;
}

export default function SuccessDialog({
  visible,
  word,
  score,
  round,
  onNextRound,
}: SuccessDialogProps) {
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
      <Dialog visible={visible} onDismiss={onNextRound}>
        <Dialog.Title style={styles.title}>🎉 Word Completed!</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.word}>{word}</Text>
            <Text style={styles.score}>Current Score: {score}</Text>
            <Text style={styles.round}>Round: {round}</Text>
            
            <Text style={styles.definitionTitle}>Definition:</Text>
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
          <Button 
            onPress={onNextRound} 
            mode="contained"
            icon="arrow-right"
          >
            Next Word
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
    fontSize: 24,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
    color: colors.text.primary,
  },
  score: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 4,
    color: colors.text.secondary,
  },
  round: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 4,
    color: colors.text.secondary,
  },
  definitionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: colors.text.primary,
  },
  definition: {
    fontSize: 16,
    marginVertical: 4,
    color: colors.text.secondary,
    lineHeight: 22,
  },
});