import { StrictOmit } from 'ts-essentials';

import { PlayerFormat } from '../player/player-format.enum';
import { Team } from '../team/team.entity';

export type TeamSeedEntity = StrictOmit<Team, 'division' | 'hostLocation'> & {
  division: number;
  hostLocation: number;
};

export const TeamSeed: Array<Partial<TeamSeedEntity>> = [
  {
    division: 2,
    format: PlayerFormat.NINE,
    hostLocation: 3,
    teamName: 'Extra Stout',
    teamNumber: 1,
  },
  {
    division: 1,
    format: PlayerFormat.EIGHT,
    hostLocation: 3,
    teamName: 'Extra Stout',
    teamNumber: 2,
  },
  {
    division: 3,
    format: PlayerFormat.NINE,
    hostLocation: 3,
    teamName: 'Extra Stout',
    teamNumber: 3,
  },
];
