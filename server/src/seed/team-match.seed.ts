import { StrictOmit } from 'ts-essentials';

import { TeamMatch } from '../team-match/team-match.entity';

export type TeamMatchSeedEntity = StrictOmit<TeamMatch, 'match' | 'team'> & {
  match: number;
  team: number;
};

export const TeamMatchSeed: Array<Partial<TeamMatchSeedEntity>> = [
  {
    homeTeam: true,
    match: 1,
    team: 1,
  },
  {
    homeTeam: false,
    match: 1,
    team: 4,
  },
  {
    homeTeam: false,
    match: 2,
    team: 2,
  },
  {
    homeTeam: true,
    match: 2,
    team: 5,
  },
  {
    homeTeam: true,
    match: 3,
    team: 6,
  },
  {
    homeTeam: false,
    match: 3,
    team: 9,
  },
  {
    homeTeam: true,
    match: 4,
    team: 4,
  },
  {
    homeTeam: false,
    match: 4,
    team: 7,
  },
  {
    homeTeam: false,
    match: 5,
    team: 5,
  },
  {
    homeTeam: true,
    match: 5,
    team: 8,
  },
  {
    homeTeam: false,
    match: 6,
    team: 3,
  },
  {
    homeTeam: true,
    match: 6,
    team: 9,
  },
  {
    homeTeam: false,
    match: 7,
    team: 1,
  },
  {
    homeTeam: true,
    match: 7,
    team: 7,
  },
  {
    homeTeam: true,
    match: 8,
    team: 2,
  },
  {
    homeTeam: false,
    match: 8,
    team: 8,
  },
  {
    homeTeam: true,
    match: 9,
    team: 3,
  },
  {
    homeTeam: false,
    match: 9,
    team: 6,
  },
];
