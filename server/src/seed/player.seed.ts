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
    skillLevel: 14,
    user: 1,
  },
  {
    format: PlayerFormat.NINE,
    playerNumber: 98200655,
    skillLevel: 6,
    user: 1,
  },
  {
    format: PlayerFormat.EIGHT,
    playerNumber: 98201234,
    skillLevel: 10,
    user: 2,
  },
  {
    format: PlayerFormat.NINE,
    playerNumber: 98201234,
    skillLevel: 1,
    user: 2,
  },
  {
    format: PlayerFormat.EIGHT,
    playerNumber: 98206789,
    skillLevel: 11,
    user: 3,
  },
  {
    format: PlayerFormat.NINE,
    playerNumber: 98206789,
    skillLevel: 2,
    user: 3,
  },
  {
    format: PlayerFormat.EIGHT,
    playerNumber: 98213579,
    skillLevel: 11,
    user: 4,
  },
  {
    format: PlayerFormat.NINE,
    playerNumber: 98213579,
    skillLevel: 2,
    user: 4,
  },
  {
    format: PlayerFormat.EIGHT,
    playerNumber: 98202468,
    skillLevel: 12,
    user: 5,
  },
  {
    format: PlayerFormat.NINE,
    playerNumber: 98202468,
    skillLevel: 3,
    user: 5,
  },
  {
    format: PlayerFormat.EIGHT,
    playerNumber: 98212089,
    skillLevel: 12,
    user: 6,
  },
  {
    format: PlayerFormat.NINE,
    playerNumber: 98212089,
    skillLevel: 3,
    user: 6,
  },
];
