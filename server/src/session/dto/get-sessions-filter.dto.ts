import { IsNumberString, IsOptional, IsString, Length } from 'class-validator';

export class GetSessionsFilterDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsNumberString()
  @IsOptional()
  @Length(4, 4)
  public year?: number;
}
