import { DayOfWeek } from '../division/day-of-week.enum';
import { Division } from '../division/division.entity';
import { PlayerFormat } from '../player/player-format.enum';

export const DivisionSeed: Array<Partial<Division>> = [
  {
    dayOfWeek: DayOfWeek.SUNDAY,
    format: PlayerFormat.EIGHT,
    name: 'SDJ8',
  },
  {
    dayOfWeek: DayOfWeek.SUNDAY,
    format: PlayerFormat.NINE,
    name: 'SDJ9',
  },
  {
    dayOfWeek: DayOfWeek.TUESDAY,
    format: PlayerFormat.NINE,
    name: 'TUE9',
  },
  {
    dayOfWeek: DayOfWeek.WEDNESDAY,
    format: PlayerFormat.EIGHT,
    name: 'WDJ8',
  },
  {
    dayOfWeek: DayOfWeek.WEDNESDAY,
    format: PlayerFormat.NINE,
    name: 'WDJ9',
  },
  {
    dayOfWeek: DayOfWeek.THURSDAY,
    format: PlayerFormat.EIGHT,
    name: 'TDJ8',
  },
  {
    dayOfWeek: DayOfWeek.THURSDAY,
    format: PlayerFormat.NINE,
    name: 'TDJ9',
  },
];
