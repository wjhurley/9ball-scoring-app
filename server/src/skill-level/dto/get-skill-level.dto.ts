import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

import { PlayerFormat } from '../../player/player-format.enum';
import { SkillLevel } from '../skill-level.entity';

export class GetSkillLevelDto {
  @IsNotEmpty()
  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  public format: PlayerFormat;

  @IsInt()
  @IsNotEmpty()
  public skillLevel: SkillLevel;
}
