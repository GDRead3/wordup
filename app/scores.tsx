// app/scores.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, DataTable, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { GameScore, getHighScores } from '../src/utils/storage/scores';

export default function ScoresScreen() {
  const [scores, setScores] = useState<GameScore[]>([]);

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = async () => {
    console.log('Loading scores...');
    const highScores = await getHighScores();
    console.log('Loaded scores:', highScores);
    
    // Sort scores by game and mode for consistent display
    const sortedScores = highScores.sort((a, b) => {
      if (a.game !== b.game) return a.game.localeCompare(b.game);
      if (a.mode !== b.mode) return a.mode.localeCompare(b.mode);
      return b.score - a.score;
    });
    
    console.log('Sorted scores:', sortedScores);
    setScores(sortedScores);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>High Scores</Title>
      {scores.length === 0 ? (
        <Title style={styles.noScores}>No high scores yet</Title>
      ) : (
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title textStyle={styles.cell} style={styles.gameColumn}>Game</DataTable.Title>
            <DataTable.Title textStyle={styles.cell} style={styles.modeColumn}>Mode</DataTable.Title>
            <DataTable.Title numeric textStyle={styles.cell} style={styles.scoreColumn}>Score</DataTable.Title>
            <DataTable.Title textStyle={styles.cell} style={styles.dateColumn}>Date</DataTable.Title>
          </DataTable.Header>

          {scores.map((item, index) => {
            console.log('Rendering score row:', item);
            return (
              <DataTable.Row key={`${item.game}-${item.mode}-${index}`}>
                <DataTable.Cell textStyle={styles.cell} style={styles.gameColumn}>{item.game}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.cell} style={styles.modeColumn}>{item.mode}</DataTable.Cell>
                <DataTable.Cell numeric textStyle={styles.cell} style={styles.scoreColumn}>{item.score}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.cell} style={styles.dateColumn}>{item.date}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      )}

      <Button 
        mode="contained" 
        style={styles.backButton}
        icon="arrow-left"
        onPress={() => router.back()}
      >
        Back to Home
      </Button>
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
    color: 'black',
  },
  table: {
    backgroundColor: '#ffffff',
    marginHorizontal: 8,
  },
  cell: {
    color: 'black',
  },
  gameColumn: {
    flex: 1.2,
  },
  modeColumn: {
    flex: 1.2,
  },
  scoreColumn: {
    flex: 0.8,
    paddingRight: 16,
  },
  dateColumn: {
    flex: 1.2,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#09E85E',
  },
  noScores: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});