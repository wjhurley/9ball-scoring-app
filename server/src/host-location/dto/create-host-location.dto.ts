import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';

export class CreateHostLocationDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  public address: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  public city: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  public name: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1000000000)
  @Max(9999999999)
  public phoneNumber: number;

  @IsNotEmpty()
  @IsString()
  @Length(2)
  public state: string;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(99999)
  public zipCode: number;
}
