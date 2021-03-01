import { IsBoolean, IsInt, IsMilitaryTime, IsOptional } from 'class-validator';

import { Match } from '../../match/match.entity';

export class UpdateGameDto {
  @IsInt()
  @IsOptional()
  deadBalls?: number;

  @IsMilitaryTime()
  @IsOptional()
  endTime?: Date;

  @IsInt()
  @IsOptional()
  innings?: number;

  @IsInt()
  @IsOptional()
  match?: Match;

  @IsBoolean()
  @IsOptional()
  postSeason?: boolean;

  @IsMilitaryTime()
  @IsOptional()
  startTime?: Date;
}
