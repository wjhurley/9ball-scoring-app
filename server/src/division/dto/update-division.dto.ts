import { IsIn, IsOptional, IsString, Length } from 'class-validator';

import { PlayerFormat } from '../../player/player-format.enum';
import { DayOfWeekName } from '../day-of-week.enum';

export class UpdateDivisionDto {
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

  @IsOptional()
  @IsString()
  @Length(1, 25)
  public name?: string;
}
