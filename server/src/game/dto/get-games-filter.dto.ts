import { IsBoolean, IsOptional } from 'class-validator';

import { Match } from '../../match/match.entity';

export class GetGamesFilterDto {
  @IsOptional()
  matchId: Match;

  @IsBoolean()
  @IsOptional()
  postSeason: boolean;
}
