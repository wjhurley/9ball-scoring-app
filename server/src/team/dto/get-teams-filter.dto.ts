import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetTeamsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  public division: string;
}
