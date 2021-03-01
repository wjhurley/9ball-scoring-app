import { IsNumberString, IsOptional } from 'class-validator';

import { IsBooleanString } from '../../lib/custom.validator';
import { Match } from '../../match/match.entity';

export class GetGamesFilterDto {
  @IsNumberString()
  @IsOptional()
  match?: Match;

  @IsBooleanString()
  @IsOptional()
  postSeason?: boolean;
}
