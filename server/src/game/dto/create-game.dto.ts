import { IsBoolean, IsMilitaryTime, IsNotEmpty } from 'class-validator';

import { Match } from '../../match/match.entity';

export class CreateGameDto {
  @IsNotEmpty()
  matchId: Match;

  @IsBoolean()
  @IsNotEmpty()
  postSeason: boolean;

  @IsMilitaryTime()
  @IsNotEmpty()
  startTime: Date;
}
