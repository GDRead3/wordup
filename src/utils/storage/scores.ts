import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the structure for game scores
export interface GameScore {
  game: string;
  mode: string;
  score: number;
  date: string;
}

// Storage key for high scores
const HIGH_SCORES_KEY = '@wordup_high_scores';

// Get all high scores
export const getHighScores = async (): Promise<GameScore[]> => {
  try {
    console.log('Getting scores from storage...');
    const scores = await AsyncStorage.getItem(HIGH_SCORES_KEY);
    console.log('Raw scores from storage:', scores);
    const parsedScores = scores ? JSON.parse(scores) : [];
    console.log('Parsed scores:', parsedScores);
    return parsedScores;
  } catch (error) {
    console.error('Error getting high scores:', error);
    return [];
  }
};

// Save a new high score
export const saveHighScore = async (newScore: GameScore): Promise<void> => {
  try {
    console.log('Saving new score:', newScore);
    
    // Validate the score data
    if (!newScore.game || !newScore.mode || typeof newScore.score !== 'number' || !newScore.date) {
      console.error('Invalid score data:', newScore);
      return;
    }

    const scores = await getHighScores();
    
    // Check if there's an existing score for this game and mode
    const existingIndex = scores.findIndex(
      score => score.game === newScore.game && score.mode === newScore.mode
    );

    if (existingIndex >= 0) {
      // Update if new score is higher
      if (newScore.score > scores[existingIndex].score) {
        scores[existingIndex] = newScore;
      }
    } else {
      // Add new score if none exists for this game/mode
      scores.push(newScore);
    }

    // Sort by score (highest first)
    scores.sort((a, b) => b.score - a.score);
    
    console.log('Saving updated scores array:', scores);
    await AsyncStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
    console.log('Scores saved successfully');
  } catch (error) {
    console.error('Error saving high score:', error);
  }
};

// Get scores for a specific game
export const getGameScores = async (game: string): Promise<GameScore[]> => {
  const scores = await getHighScores();
  return scores.filter(score => score.game === game);
}; 