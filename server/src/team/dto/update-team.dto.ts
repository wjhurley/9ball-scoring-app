import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

import { Division } from '../../division/division.entity';
import { HostLocation } from '../../host-location/host-location.entity';
import { PlayerFormat } from '../../player/player-format.enum';

export class UpdateTeamDto {
  @IsOptional()
  public division: Division;

  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  @IsOptional()
  public format: PlayerFormat;

  @IsOptional()
  public hostLocation: HostLocation;

  @IsOptional()
  @IsString()
  public teamName: string;

  @IsInt()
  @IsOptional()
  public teamNumber: number;
}
