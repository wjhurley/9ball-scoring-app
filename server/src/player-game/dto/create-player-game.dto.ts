import { IsInt, IsNotEmpty } from 'class-validator';

import { Game } from '../../game/game.entity';
import { Player } from '../../player/player.entity';

export class CreatePlayerGameDto {
  @IsInt()
  @IsNotEmpty()
  public game: Game;

  @IsInt()
  @IsNotEmpty()
  public player: Player;
}
