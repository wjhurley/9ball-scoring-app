import { IsISO8601, IsNumberString, IsOptional } from 'class-validator';

import { IsBooleanString } from '../../lib/custom.validator';
import { Session } from '../../session/session.entity';

export class GetMatchesFilterDto {
  @IsISO8601({ strict: true })
  @IsOptional()
  matchDate: Date;

  @IsBooleanString()
  @IsOptional()
  postSeason: boolean;

  @IsNumberString()
  @IsOptional()
  sessionId: Session;

  @IsNumberString()
  @IsOptional()
  weekNumber: number;
}
