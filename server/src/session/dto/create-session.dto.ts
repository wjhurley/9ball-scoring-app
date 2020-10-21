import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

import { NumberLength } from '../../lib/custom.validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  public name: string;

  @IsInt()
  @IsNotEmpty()
  @NumberLength(4)
  public year: number;
}
