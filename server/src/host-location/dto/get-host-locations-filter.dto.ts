import { IsNumberString, IsOptional, IsString, Length } from 'class-validator';

export class GetHostLocationsFilterDto {
  @IsOptional()
  @IsString()
  public address: string;

  @IsOptional()
  @IsString()
  public name: string;

  @IsNumberString()
  @IsOptional()
  @Length(10, 10)
  public phoneNumber: number;
}
