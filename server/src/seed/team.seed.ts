import { StrictOmit } from 'ts-essentials';

import { PlayerFormat } from '../player/player-format.enum';
import { Team } from '../team/team.entity';

export type TeamSeedEntity = StrictOmit<Team, 'division' | 'hostLocation'> & {
  division: number;
  hostLocation: number;
};

export const TeamSeed: Array<Partial<TeamSeedEntity>> = [
  {
    division: 1,
    format: PlayerFormat.EIGHT,
    hostLocation: 3,
    teamName: 'Extra Stout',
    teamNumber: 2,
  },
  {
    division: 2,
    format: PlayerFormat.NINE,
    hostLocation: 3,
    teamName: 'Extra Stout',
    teamNumber: 1,
  },
  {
    division: 3,
    format: PlayerFormat.NINE,
    hostLocation: 3,
    teamName: 'Extra Stout',
    teamNumber: 3,
  },
  {
    division: 1,
    format: PlayerFormat.EIGHT,
    hostLocation: 1,
    teamName: 'Sharp Shooters',
    teamNumber: 4,
  },
  {
    division: 2,
    format: PlayerFormat.NINE,
    hostLocation: 1,
    teamName: 'Sharp Shooters',
    teamNumber: 5,
  },
  {
    division: 3,
    format: PlayerFormat.NINE,
    hostLocation: 1,
    teamName: 'Sharp Shooters',
    teamNumber: 6,
  },
  {
    division: 1,
    format: PlayerFormat.EIGHT,
    hostLocation: 2,
    teamName: 'Shaolin Style',
    teamNumber: 7,
  },
  {
    division: 2,
    format: PlayerFormat.NINE,
    hostLocation: 2,
    teamName: 'Shaolin Style',
    teamNumber: 8,
  },
  {
    division: 3,
    format: PlayerFormat.NINE,
    hostLocation: 2,
    teamName: 'Shaolin Style',
    teamNumber: 9,
  },
];
