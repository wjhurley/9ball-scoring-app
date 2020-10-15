import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetSessionsFilterDto {
  @IsOptional()
  @IsString()
  public name: string;

  @IsInt()
  @IsOptional()
  public year: number;
}
