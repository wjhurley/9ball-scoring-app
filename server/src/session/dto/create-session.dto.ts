import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

import { NumberLength } from '../../lib/custom.validator';
import { SessionName } from '../session-name.enum';

export class CreateSessionDto {
  @IsIn([SessionName.FALL, SessionName.SPRING, SessionName.SUMMER])
  @IsNotEmpty()
  public name: SessionName;

  @IsInt()
  @IsNotEmpty()
  @NumberLength(4)
  public year: number;
}
