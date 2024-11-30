// app/home.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Card, Paragraph, Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>WordUp</Title>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.modeCardTitle}>Welcome to WordUp!</Title>
          <Paragraph style = {styles.modeCardText}>
            Enhance your vocabulary through fun and interactive games.
            Choose from different themes and challenge yourself!
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button 
            mode="contained" 
            onPress={() => router.push('/hangman')}
          >
            Start Playing
          </Button>
        </Card.Actions>
      </Card>
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
    color: 'black'
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#09E85E',
    color: '#000000'
  },
  modeCardTitle: {
    color: '#000000'
  },
  modeCardText: {
    color: '#000000'
  },
});