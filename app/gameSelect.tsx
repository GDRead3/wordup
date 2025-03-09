import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type GameInfo = {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    color: string;
    comingSoon?: boolean;
};

export default function GameSelectScreen() {
    const games: GameInfo[] = [
        {
            id: 'hangman',
            title: 'Hangman',
            description: 'Guess the word one letter at a time before the hangman is complete!',
            icon: 'human-handsdown',
            color: '#3A86FF',
        },
        {
            id: 'wordscramble',
            title: 'Word Scramble',
            description: 'Unscramble the letters to form the correct word.',
            icon: 'shuffle-variant',
            color: '#8338EC',
            comingSoon: true,
        },
        {
            id: 'wordmatch',
            title: 'Word Match',
            description: 'Match words with their definitions in this memory game.',
            icon: 'card-account-details-outline',
            color: '#FF006E',
            comingSoon: true,
        },
        {
            id: 'wordsearch',
            title: 'Word Search',
            description: 'Find hidden words in a grid of letters.',
            icon: 'magnify',
            color: '#FB5607',
            comingSoon: true,
        },
    ];

    const navigateToGame = (gameId: string) => {
        if (gameId === 'hangman') {
            router.push('/hangman');
        } else {
            // For future implementation
            alert('Coming soon!');
        }
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Select a Game</Title>
            <ScrollView>
                {games.map((game) => (
                    <Card 
                        key={game.id} 
                        style={[styles.card, { backgroundColor: game.color }]}
                        onPress={() => !game.comingSoon && navigateToGame(game.id)}
                    >
                        <Card.Content style={styles.cardContent}>
                            <View style={styles.iconContainer}>
                                <MaterialCommunityIcons name={game.icon} size={40} color="#FFFFFF" />
                            </View>
                            <View style={styles.textContainer}>
                                <Title style={styles.cardTitle}>{game.title}</Title>
                                <Paragraph style={styles.cardDescription}>{game.description}</Paragraph>
                            </View>
                        </Card.Content>
                        <Card.Actions style={styles.cardActions}>
                            <Button 
                                mode="contained" 
                                onPress={() => navigateToGame(game.id)}
                                disabled={game.comingSoon}
                                style={styles.button}
                                labelStyle={styles.buttonLabel}
                            >
                                {game.comingSoon ? 'Coming Soon' : 'Play Now'}
                            </Button>
                        </Card.Actions>
                    </Card>
                ))}
            </ScrollView>
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
        color: '#000000',
    },
    card: {
        marginVertical: 10,
        borderRadius: 10,
        elevation: 4,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    cardDescription: {
        color: '#FFFFFF',
    },
    cardActions: {
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
    },
    buttonLabel: {
        color: '#000000',
    },
});