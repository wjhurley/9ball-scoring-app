import { StrictOmit } from 'ts-essentials';

import { PlayerGame } from '../player-game/player-game.entity';

export type PlayerGameSeedEntity = StrictOmit<PlayerGame, 'game' | 'player'> & {
  game: number;
  player: number;
};

export const PlayerGameSeed: Array<Partial<PlayerGameSeedEntity>> = [
  {
    game: 1,
    player: 3,
  },
  {
    game: 1,
    player: 5,
  },
  {
    game: 2,
    player: 9,
  },
  {
    game: 2,
    player: 11,
  },
  {
    game: 3,
    player: 4,
  },
  {
    game: 3,
    player: 6,
  },
  {
    game: 4,
    player: 10,
  },
  {
    game: 4,
    player: 12,
  },
  {
    game: 5,
    player: 2,
  },
  {
    game: 5,
    player: 6,
  },
  {
    game: 6,
    player: 8,
  },
  {
    game: 6,
    player: 12,
  },
  {
    game: 7,
    player: 1,
  },
  {
    game: 7,
    player: 5,
  },
  {
    game: 8,
    player: 7,
  },
  {
    game: 8,
    player: 11,
  },
  {
    game: 9,
    player: 2,
  },
  {
    game: 9,
    player: 6,
  },
  {
    game: 10,
    player: 8,
  },
  {
    game: 10,
    player: 12,
  },
  {
    game: 11,
    player: 2,
  },
  {
    game: 11,
    player: 4,
  },
  {
    game: 12,
    player: 8,
  },
  {
    game: 12,
    player: 10,
  },
  {
    game: 13,
    player: 1,
  },
  {
    game: 13,
    player: 3,
  },
  {
    game: 14,
    player: 7,
  },
  {
    game: 14,
    player: 9,
  },
  {
    game: 15,
    player: 2,
  },
  {
    game: 15,
    player: 4,
  },
  {
    game: 16,
    player: 8,
  },
  {
    game: 16,
    player: 10,
  },
  {
    game: 17,
    player: 4,
  },
  {
    game: 17,
    player: 6,
  },
  {
    game: 18,
    player: 10,
  },
  {
    game: 18,
    player: 12,
  },
];
