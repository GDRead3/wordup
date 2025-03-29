// app/scores.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, DataTable } from 'react-native-paper';

interface Score {
  theme: string;
  score: number;
  date: string;
}

export default function ScoresScreen() {
  const scores: Score[] = [
    { theme: 'Quick', score: 850, date: '2024-11-25' },
    { theme: 'Marathon', score: 720, date: '2024-11-24' },
    { theme: 'Casual', score: 0, date: '2024-11-23' },
  ];

  return (
    <View style={styles.container}>
      <Title style={styles.title}>High Scores</Title>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Theme</DataTable.Title>
          <DataTable.Title numeric>Score</DataTable.Title>
        </DataTable.Header>

        {scores.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{item.theme}</DataTable.Cell>
            <DataTable.Cell numeric>{item.score}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
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
});