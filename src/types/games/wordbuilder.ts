/**
 * Word Builder Game Types
 * Defines the core types and interfaces for the word builder game mode.
 * This game mode challenges players to create words using given letters
 * within a time limit, with different difficulty levels and scoring rules.
 */

/**
 * Available game modes for Word Builder
 * - quick: Short rounds with specific time limits
 * - marathon: Extended gameplay with multiple rounds
 * - casual: No time limit, focus on word discovery
 */
export type WordBuilderMode = 'quick' | 'marathon' | 'casual';

/**
 * Possible positions where root letters can appear in words
 * - start: Letters must appear at the beginning
 * - middle: Letters must appear in the middle
 * - end: Letters must appear at the end
 * - any: Letters can appear anywhere in the word
 */
export type LetterPosition = 'start' | 'middle' | 'end' | 'any';

/**
 * Current state of the game
 * Tracks all game-related data including progress, score, and timing
 */
export interface WordBuilderState {
  /** The letters that must be used in each word */
  rootLetters: string;
  /** Where the root letters must appear in valid words */
  letterPosition: LetterPosition;
  /** Set of words successfully found by the player */
  foundWords: Set<string>;
  /** Time remaining in the current round (in seconds) */
  timeRemaining: number;
  /** Current total score */
  score: number;
  /** Current round number */
  round: number;
  /** Current state of the game */
  gameStatus: 'playing' | 'paused' | 'finished';
  /** Current game mode */
  mode: WordBuilderMode | null;
  /** Current round's time limit */
  timeLimit: number;
  /** Minimum length for valid words */
  minWordLength: number;
  /** Number of letters in the root sequence */
  letterCount: number;
}

/**
 * Configuration options for each game mode
 * Defines the rules and parameters for different difficulty levels
 */
export interface ModeOption {
  /** Unique identifier for the mode */
  id: WordBuilderMode;
  /** Display name for the mode */
  name: string;
  /** Description of the mode's rules and objectives */
  description: string;
  /** Time limit in seconds for each round */
  timeLimit: number;
  /** Number of letters in the root sequence */
  letterCount: number;
  /** Minimum length for valid words */
  minWordLength: number;
  /** Position where root letters must appear */
  letterPosition: LetterPosition;
}

/**
 * Configuration for scoring rules
 * Defines how points are calculated for different word lengths
 */
export interface ScoringConfig {
  /** Base points for minimum word length */
  basePoints: number;
  /** Additional points per letter beyond minimum length */
  pointsPerLetter: number;
  /** Bonus multiplier for using all root letters */
  rootLetterBonus: number;
  /** Time bonus points per second remaining */
  timeBonus: number;
}

/**
 * Game statistics for the current session
 * Tracks performance metrics and achievements
 */
export interface GameStats {
  /** Total words found */
  totalWords: number;
  /** Average word length */
  averageLength: number;
  /** Longest word found */
  longestWord: string;
  /** Shortest word found */
  shortestWord: string;
  /** Words found per minute */
  wordsPerMinute: number;
}
