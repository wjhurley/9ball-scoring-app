import { IsInt, IsNotEmpty } from 'class-validator';

import { Division } from '../../division/division.entity';
import { HostLocation } from '../../host-location/host-location.entity';

export class CreateTeamDto {
  @IsNotEmpty()
  public division: Division;

  @IsNotEmpty()
  public hostLocation: HostLocation;

  @IsNotEmpty()
  public teamName: string;

  @IsInt()
  @IsNotEmpty()
  public teamNumber: number;
}
