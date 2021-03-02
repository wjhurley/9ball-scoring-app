import { StrictOmit } from 'ts-essentials';

import { PlayerTeam } from '../player-team/player-team.entity';

export type PlayerTeamSeedEntity = StrictOmit<PlayerTeam, 'player' | 'team'> & {
  player: number;
  team: number;
};

export const PlayerTeamSeed: Array<Partial<PlayerTeamSeedEntity>> = [
  {
    captain: true,
    coCaptain: false,
    player: 1,
    team: 1,
  },
  {
    captain: true,
    coCaptain: false,
    player: 3,
    team: 2,
  },
];
