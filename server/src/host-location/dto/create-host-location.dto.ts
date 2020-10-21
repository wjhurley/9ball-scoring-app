import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

import { NumberLength } from '../../lib/custom.validator';

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
  @NumberLength(10)
  public phoneNumber: number;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  public state: string;

  @IsInt()
  @IsNotEmpty()
  @NumberLength(5)
  public zipCode: number;
}
