import { ModeOption } from '../types/games/hangman';

export const GAME_MODES: ModeOption[] = [
  { id: 'quick', name: 'Quick Mode', description: '10 rounds, 6 lives' },
  { id: 'marathon', name: 'Marathon Mode', description: 'Unlimited rounds, 6 lives' },
  { id: 'casual', name: 'Casual Mode', description: 'Unlimited rounds, unlimited lives' }
];

export const MODE_CONFIGS = {
  quick: { lives: 6, maxRounds: 10 },
  marathon: { lives: 6, maxRounds: null },
  casual: { lives: Infinity, maxRounds: null }
};

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');