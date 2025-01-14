import { WORDS } from '../../data/words';
import { GameState, GameMode } from '../../types/games/hangman';
import { MODE_CONFIGS } from '../../constants/gameConfig';
import { wordService } from '@/src/services/wordService';

export const getNewWord = () => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
};

export const createInitialGameState = async (mode: GameMode): Promise<GameState> => {
  const config = MODE_CONFIGS[mode];
  const word = await wordService.getRandomWord();

  return {
    currentWord: word,
    guessedLetters: new Set(),
    remainingLives: config.lives,
    score: 0,
    gameStatus: 'playing',
    round: 1,
    maxRounds: config.maxRounds,
    mode: mode,
    definition: null
  };
};

export const checkGameStatus = (word: string, guessedLetters: Set<string>, lives: number) => {
  const isWordComplete = [...word].every(char => guessedLetters.has(char));
  if (isWordComplete) return 'won';
  if (lives <= 0) return 'lost';
  return 'playing';
};