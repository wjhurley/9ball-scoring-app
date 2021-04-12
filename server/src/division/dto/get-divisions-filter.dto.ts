import { IsIn, IsOptional } from 'class-validator';

import { PlayerFormat } from '../../player/player-format.enum';
import { DayOfWeekName } from '../day-of-week.enum';

export class GetDivisionsFilterDto {
  @IsIn([
    DayOfWeekName.SUNDAY,
    DayOfWeekName.MONDAY,
    DayOfWeekName.TUESDAY,
    DayOfWeekName.WEDNESDAY,
    DayOfWeekName.THURSDAY,
    DayOfWeekName.FRIDAY,
    DayOfWeekName.SATURDAY,
  ])
  @IsOptional()
  public dayOfWeek?: DayOfWeekName;

  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  @IsOptional()
  public format?: PlayerFormat;
}
