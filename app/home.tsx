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
      </Card>

      <View style={styles.menuContainer}>
        <Button 
          mode="contained"
          style={styles.menuButton}
          icon="gamepad-variant"
          onPress={() => router.push('/gameSelect')}
        >
          Select Games
        </Button>

        <Button 
          mode="contained"
          style={styles.menuButton}
          icon="trophy"
          onPress={() => router.push('/scores')}
        >
          High Scores
        </Button>

        <Button 
          mode="contained"
          style={styles.menuButton}
          icon="cog"
          onPress={() => router.push('/settings')}
        >
          Settings
        </Button>

        <Button 
          mode="contained"
          style={[styles.menuButton, styles.quitButton]}
          icon="exit-to-app"
          onPress={() => router.back()}
        >
          Quit - currently causes a crash
        </Button>
      </View>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000'
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#09E85E',
  },
  modeCardTitle: {
    color: '#000000',
    fontSize: 24,
  },
  modeCardText: {
    color: '#000000',
    fontSize: 16,
    marginTop: 8,
  },
  menuContainer: {
    marginTop: 20,
    gap: 12,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
  quitButton: {
    backgroundColor: '#ff4444',
    marginTop: 20,
  },
});