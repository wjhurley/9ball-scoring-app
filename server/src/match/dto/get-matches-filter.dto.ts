import { IsBoolean, IsInt, IsISO8601, IsOptional } from 'class-validator';

import { Session } from '../../session/session.entity';

export class GetMatchesFilterDto {
  @IsISO8601({ strict: true })
  @IsOptional()
  matchDate: Date;

  @IsBoolean()
  @IsOptional()
  postSeason: boolean;

  @IsOptional()
  sessionId: Session;

  @IsInt()
  @IsOptional()
  weekNumber: number;
}
