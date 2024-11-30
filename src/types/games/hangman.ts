export type GameMode = 'quick' | 'marathon' | 'casual';

export interface GameState {
  currentWord: string;
  guessedLetters: Set<string>;
  remainingLives: number;
  score: number;
  gameStatus: 'playing' | 'won' | 'lost';
  round: number;
  maxRounds: number | null;
  mode: GameMode | null;
}

export interface ModeOption {
  id: GameMode;
  name: string;
  description: string;
}