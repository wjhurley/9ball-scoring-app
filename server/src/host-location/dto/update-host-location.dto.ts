import { IsInt, IsOptional, IsString, Length } from 'class-validator';

import { NumberLength } from '../../lib/custom.validator';

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
  @NumberLength(10)
  public phoneNumber: number;

  @IsOptional()
  @IsString()
  @Length(2, 2)
  public state: string;

  @IsInt()
  @IsOptional()
  @NumberLength(5)
  public zipCode: number;
}
