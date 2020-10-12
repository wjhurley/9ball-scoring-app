import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class GetHostLocationsFilterDto {
  @IsOptional()
  @IsString()
  public address: string;

  @IsOptional()
  @IsString()
  public name: string;

  @IsInt()
  @IsOptional()
  @Length(10)
  public phoneNumber: number;
}
