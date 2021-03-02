import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePlayerTeamDto {
  @IsBoolean()
  @IsOptional()
  public captain?: boolean;

  @IsBoolean()
  @IsOptional()
  public coCaptain?: boolean;
}
