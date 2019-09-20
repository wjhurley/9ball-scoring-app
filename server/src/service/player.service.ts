import { Injectable } from '@nestjs/common';

import { Player } from '../entity/Player';

@Injectable()
export class PlayerService {
  private readonly players: Player[] = [];

  public create(player: Player): void {
    this.players.push(player);
  }

  public findAll(): Player[] {
    return this.players;
  }
}
