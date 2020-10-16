import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

import { SkillLevel } from '../../skill-level/skill-level.entity';
import { PlayerFormat } from '../player-format.enum';

export class CreatePlayerDto {
  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  @IsNotEmpty()
  public format: PlayerFormat;

  @IsInt()
  @IsNotEmpty()
  public playerNumber: number;

  @IsNotEmpty()
  public skillLevel: SkillLevel;
}
