import { DayOfWeekName } from '../division/day-of-week.enum';
import { Division } from '../division/division.entity';
import { PlayerFormat } from '../player/player-format.enum';

export const DivisionSeed: Array<Partial<Division>> = [
  {
    dayOfWeek: DayOfWeekName.SUNDAY,
    format: PlayerFormat.EIGHT,
    name: 'SDJ8',
  },
  {
    dayOfWeek: DayOfWeekName.SUNDAY,
    format: PlayerFormat.NINE,
    name: 'SDJ9',
  },
  {
    dayOfWeek: DayOfWeekName.TUESDAY,
    format: PlayerFormat.NINE,
    name: 'TUE9',
  },
  {
    dayOfWeek: DayOfWeekName.WEDNESDAY,
    format: PlayerFormat.EIGHT,
    name: 'WDJ8',
  },
  {
    dayOfWeek: DayOfWeekName.WEDNESDAY,
    format: PlayerFormat.NINE,
    name: 'WDJ9',
  },
  {
    dayOfWeek: DayOfWeekName.THURSDAY,
    format: PlayerFormat.EIGHT,
    name: 'TDJ8',
  },
  {
    dayOfWeek: DayOfWeekName.THURSDAY,
    format: PlayerFormat.NINE,
    name: 'TDJ9',
  },
];
