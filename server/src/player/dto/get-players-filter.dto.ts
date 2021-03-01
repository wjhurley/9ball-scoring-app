import { IsIn, IsOptional } from 'class-validator';

import { PlayerFormat } from '../player-format.enum';

export class GetPlayersFilterDto {
  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  @IsOptional()
  public format?: PlayerFormat;
}
