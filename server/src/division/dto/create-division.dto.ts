import { IsIn, IsNotEmpty, IsString, Length } from 'class-validator';

import { PlayerFormat } from '../../player/player-format.enum';
import { DayOfWeekName } from '../day-of-week.enum';

export class CreateDivisionDto {
  @IsIn([
    DayOfWeekName.SUNDAY,
    DayOfWeekName.MONDAY,
    DayOfWeekName.TUESDAY,
    DayOfWeekName.WEDNESDAY,
    DayOfWeekName.THURSDAY,
    DayOfWeekName.FRIDAY,
    DayOfWeekName.SATURDAY,
  ])
  @IsNotEmpty()
  public dayOfWeek: DayOfWeekName;

  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  @IsNotEmpty()
  public format: PlayerFormat;

  @IsNotEmpty()
  @IsString()
  @Length(1, 25)
  public name: string;
}
