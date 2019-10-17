import { IsIn, IsOptional } from 'class-validator';

import { PlayerFormat } from '../player-format.enum';

export class GetPlayerInfoDto {
  @IsOptional()
  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  public format: PlayerFormat;
}
