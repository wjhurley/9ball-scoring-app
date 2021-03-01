import { IsInt, IsOptional, IsString } from 'class-validator';

import { NumberLength } from '../../lib/custom.validator';

export class UpdateSessionDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsInt()
  @IsOptional()
  @NumberLength(4)
  public year?: number;
}
