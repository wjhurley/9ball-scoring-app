import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

import { SkillLevel } from '../../entity/skill-level.entity';
import { PlayerFormat } from '../player-format.enum';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  public format: PlayerFormat;

  @IsInt()
  @IsNotEmpty()
  public playerNumber: number;

  @IsNotEmpty()
  public skillLevel: SkillLevel;
}
