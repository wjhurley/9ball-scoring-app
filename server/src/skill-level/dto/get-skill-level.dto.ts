import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

import { PlayerFormat } from '../../player/player-format.enum';
import { SkillLevel } from '../skill-level.entity';

export class GetSkillLevelDto {
  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  @IsNotEmpty()
  public format: PlayerFormat;

  @IsInt()
  @IsNotEmpty()
  public skillLevel: SkillLevel;
}
