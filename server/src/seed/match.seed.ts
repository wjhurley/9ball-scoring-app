import * as dateFns from 'date-fns';
import { StrictOmit } from 'ts-essentials';

import { DayOfWeek } from '../division/day-of-week.enum';
import { Match } from '../match/match.entity';

export type MatchSeedEntity = StrictOmit<Match, 'session'> & {
  session: number;
};

export const startingSunday = dateFns.set(dateFns.setDay(new Date(), DayOfWeek.SUNDAY), {
  hours: 17,
  minutes: 0,
});
export const startingTuesday = dateFns.set(dateFns.setDay(new Date(), DayOfWeek.TUESDAY), {
  hours: 17,
  minutes: 0,
});

export const MatchSeed: Array<Partial<MatchSeedEntity>> = [
  {
    matchDate: startingSunday,
    postSeason: false,
    session: 1,
    startTime: new Date(),
    weekNumber: 1,
  },
  {
    matchDate: startingSunday,
    postSeason: false,
    session: 1,
    startTime: new Date(),
    weekNumber: 1,
  },
  {
    matchDate: startingTuesday,
    postSeason: false,
    session: 1,
    startTime: new Date(),
    weekNumber: 1,
  },
  {
    matchDate: dateFns.addWeeks(startingSunday, 1),
    postSeason: false,
    session: 1,
    startTime: new Date(),
    weekNumber: 2,
  },
  {
    matchDate: dateFns.addWeeks(startingSunday, 1),
    postSeason: false,
    session: 1,
    startTime: new Date(),
    weekNumber: 2,
  },
  {
    matchDate: dateFns.addWeeks(startingTuesday, 1),
    postSeason: false,
    session: 1,
    startTime: new Date(),
    weekNumber: 2,
  },
  {
    matchDate: dateFns.addWeeks(startingSunday, 2),
    postSeason: false,
    session: 1,
    startTime: new Date(),
    weekNumber: 3,
  },
  {
    matchDate: dateFns.addWeeks(startingSunday, 2),
    postSeason: false,
    session: 1,
    startTime: new Date(),
    weekNumber: 3,
  },
  {
    matchDate: dateFns.addWeeks(startingTuesday, 2),
    postSeason: false,
    session: 1,
    startTime: new Date(),
    weekNumber: 3,
  },
];
