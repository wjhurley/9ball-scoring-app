import * as dateFns from 'date-fns';
import { StrictOmit } from 'ts-essentials';

import { Game } from '../game/game.entity';
import { startingSunday, startingTuesday } from './match.seed';

export type GameSeedEntity = StrictOmit<Game, 'match'> & {
  match: number;
};

export const GameSeed: Array<Partial<GameSeedEntity>> = [
  {
    match: 1,
    postSeason: false,
    startTime: startingSunday,
  },
  {
    match: 1,
    postSeason: false,
    startTime: dateFns.addHours(startingSunday, 1),
  },
  {
    match: 2,
    postSeason: false,
    startTime: startingSunday,
  },
  {
    match: 2,
    postSeason: false,
    startTime: dateFns.addHours(startingSunday, 1),
  },
  {
    match: 3,
    postSeason: false,
    startTime: startingTuesday,
  },
  {
    match: 3,
    postSeason: false,
    startTime: dateFns.addHours(startingTuesday, 1),
  },
  {
    match: 4,
    postSeason: false,
    startTime: dateFns.addWeeks(startingSunday, 1),
  },
  {
    match: 4,
    postSeason: false,
    startTime: dateFns.add(startingSunday, { weeks: 1, hours: 1 }),
  },
  {
    match: 5,
    postSeason: false,
    startTime: dateFns.addWeeks(startingSunday, 1),
  },
  {
    match: 5,
    postSeason: false,
    startTime: dateFns.add(startingSunday, { weeks: 1, hours: 1 }),
  },
  {
    match: 6,
    postSeason: false,
    startTime: dateFns.addWeeks(startingTuesday, 1),
  },
  {
    match: 6,
    postSeason: false,
    startTime: dateFns.add(startingTuesday, { weeks: 1, hours: 1 }),
  },
  {
    match: 7,
    postSeason: false,
    startTime: dateFns.addWeeks(startingSunday, 2),
  },
  {
    match: 7,
    postSeason: false,
    startTime: dateFns.add(startingSunday, { weeks: 2, hours: 1 }),
  },
  {
    match: 8,
    postSeason: false,
    startTime: dateFns.addWeeks(startingSunday, 2),
  },
  {
    match: 8,
    postSeason: false,
    startTime: dateFns.add(startingSunday, { weeks: 2, hours: 1 }),
  },
  {
    match: 9,
    postSeason: false,
    startTime: dateFns.addWeeks(startingTuesday, 2),
  },
  {
    match: 9,
    postSeason: false,
    startTime: dateFns.add(startingTuesday, { weeks: 2, hours: 1 }),
  },
];
