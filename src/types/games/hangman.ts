/**
 * Hangman Game Types
 * Defines the core types and interfaces for the hangman game mode.
 * This game mode challenges players to guess words letter by letter
 * before running out of lives, with different difficulty levels and scoring rules.
 */

/**
 * Available game modes for Hangman
 * - quick: 10 rounds with limited lives
 * - marathon: Unlimited rounds with lives resetting each round
 * - casual: No lives limit, focus on word discovery
 */
export type GameMode = 'quick' | 'marathon' | 'casual';

/**
 * Current state of the game
 * Tracks all game-related data including progress, score, and display settings
 */
export interface GameState {
  /** The word to be guessed */
  currentWord: string;
  /** Set of letters already guessed by the player */
  guessedLetters: Set<string>;
  /** Number of lives remaining */
  remainingLives: number;
  /** Current total score */
  score: number;
  /** Current state of the game */
  gameStatus: 'playing' | 'won' | 'lost';
  /** Current round number */
  round: number;
  /** Maximum number of rounds (null for unlimited) */
  maxRounds: number | null;
  /** Current game mode */
  mode: GameMode | null;
  /** Word definition(s) for educational purposes */
  definition: string[] | null;
  /** Display settings for word rendering */
  displaySettings?: {
    /** Font size for word display */
    fontSize: number;
    /** Spacing between letters */
    letterSpacing: number;
  };
}

/**
 * Configuration options for each game mode
 * Defines the rules and parameters for different difficulty levels
 */
export interface ModeOption {
  /** Unique identifier for the mode */
  id: GameMode;
  /** Display name for the mode */
  name: string;
  /** Description of the mode's rules and objectives */
  description: string;
}

/**
 * Configuration for scoring rules
 * Defines how points are calculated for different actions
 */
export interface ScoringConfig {
  /** Points for correctly guessing a letter */
  correctGuess: number;
  /** Points for completing a word */
  wordComplete: number;
  /** Bonus points for completing a word with lives remaining */
  livesBonus: number;
  /** Multiplier for consecutive correct guesses */
  streakMultiplier: number;
}

/**
 * Game statistics for the current session
 * Tracks performance metrics and achievements
 */
export interface GameStats {
  /** Total words completed */
  wordsCompleted: number;
  /** Total letters correctly guessed */
  lettersGuessed: number;
  /** Longest streak of correct guesses */
  longestStreak: number;
  /** Average guesses per word */
  averageGuesses: number;
  /** Words completed per minute */
  wordsPerMinute: number;
}