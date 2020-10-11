import { IsIn, IsOptional } from 'class-validator';

import { PlayerFormat } from '../../player/player-format.enum';
import { DayOfWeek } from '../day-of-week.enum';

export class GetDivisionsFilterDto {
  @IsOptional()
  @IsIn([
    DayOfWeek.SUNDAY,
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY,
    DayOfWeek.SATURDAY,
  ])
  public dayOfWeek: DayOfWeek;

  @IsOptional()
  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  public format: PlayerFormat;
}
