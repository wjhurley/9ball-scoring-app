import { IsIn, IsNumberString, IsOptional } from 'class-validator';

import { Division } from '../../division/division.entity';
import { HostLocation } from '../../host-location/host-location.entity';
import { PlayerFormat } from '../../player/player-format.enum';

export class GetTeamsFilterDto {
  @IsNumberString()
  @IsOptional()
  public division?: Division;

  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  @IsOptional()
  public format?: PlayerFormat;

  @IsNumberString()
  @IsOptional()
  public hostLocation?: HostLocation;
}
