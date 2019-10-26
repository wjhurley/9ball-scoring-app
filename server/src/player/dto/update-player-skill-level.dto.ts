import { IsIn, IsNotEmpty } from 'class-validator';

import { SkillLevel } from '../../skill-level/skill-level.entity';
import { PlayerFormat } from '../player-format.enum';

export class UpdatePlayerSkillLevelDto {
  @IsNotEmpty()
  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  public format: PlayerFormat;

  @IsNotEmpty()
  public skillLevel: SkillLevel;
}
