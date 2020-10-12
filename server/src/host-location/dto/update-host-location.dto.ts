import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class UpdateHostLocationDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  public address: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  public city: string;

  @IsOptional()
  @IsString()
  @Length(1, 30)
  public name: string;

  @IsInt()
  @IsOptional()
  @Min(1000000000)
  @Max(9999999999)
  public phoneNumber: number;

  @IsOptional()
  @IsString()
  @Length(2)
  public state: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(99999)
  public zipCode: number;
}
