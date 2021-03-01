import { StrictOmit } from 'ts-essentials';

import { PlayerFormat } from '../player/player-format.enum';
import { Player } from '../player/player.entity';

export type PlayerSeedEntity = StrictOmit<Player, 'skillLevel' | 'user'> & {
  skillLevel: number;
  user: number;
};

export const PlayerSeed: Array<Partial<PlayerSeedEntity>> = [
  {
    format: PlayerFormat.EIGHT,
    playerNumber: 98200655,
    skillLevel: 6,
    user: 1,
  },
  {
    format: PlayerFormat.NINE,
    playerNumber: 98200655,
    skillLevel: 14,
    user: 1,
  },
];
