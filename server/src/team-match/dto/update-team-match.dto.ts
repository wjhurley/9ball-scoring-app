import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class UpdateTeamMatchDto {
  @IsInt()
  @IsOptional()
  public forfeits?: number;

  @IsBoolean()
  @IsOptional()
  public homeTeam?: boolean;

  @IsBoolean()
  @IsOptional()
  public won?: boolean;
}
