import { IsIn, IsOptional, IsString, Length } from 'class-validator';

import { PlayerFormat } from '../../player/player-format.enum';
import { DayOfWeek } from '../day-of-week.enum';

export class UpdateDivisionDto {
  @IsIn([
    DayOfWeek.SUNDAY,
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY,
    DayOfWeek.SATURDAY,
  ])
  @IsOptional()
  public dayOfWeek?: DayOfWeek;

  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  @IsOptional()
  public format?: PlayerFormat;

  @IsOptional()
  @IsString()
  @Length(1, 25)
  public name?: string;
}
