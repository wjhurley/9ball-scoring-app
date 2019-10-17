import { IsIn, IsNotEmpty } from 'class-validator';

import { SkillLevel } from '../../entity/skill-level.entity';
import { PlayerFormat } from '../player-format.enum';

export class CreatePlayerDto {
  @IsNotEmpty()
  public playerNumber: number;

  @IsNotEmpty()
  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  public format: PlayerFormat;

  @IsNotEmpty()
  public skillLevel: SkillLevel;
}
