import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class UpdatePlayerGameDto {
  @IsInt()
  @IsOptional()
  public breakAndRun?: number;

  @IsInt()
  @IsOptional()
  public defense?: number;

  @IsInt()
  @IsOptional()
  public nineOnSnap?: number;

  @IsInt()
  @IsOptional()
  public playerScore?: number;

  @IsInt()
  @IsOptional()
  public pointsScored?: number;

  @IsBoolean()
  @IsOptional()
  public skunk?: boolean;

  @IsInt()
  @IsOptional()
  public timeouts?: number;

  @IsBoolean()
  @IsOptional()
  public won?: boolean;
}
