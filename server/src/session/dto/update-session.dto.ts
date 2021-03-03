import { IsIn, IsInt, IsOptional } from 'class-validator';

import { NumberLength } from '../../lib/custom.validator';
import { SessionName } from '../session-name.enum';

export class UpdateSessionDto {
  @IsIn([SessionName.FALL, SessionName.SPRING, SessionName.SUMMER])
  @IsOptional()
  public name?: SessionName;

  @IsInt()
  @IsOptional()
  @NumberLength(4)
  public year?: number;
}
