import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { Repository } from 'typeorm';

import { Player } from './player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  private readonly players: Player[] = [];

  public authenticate(player: Partial<Player>) {
    // TODO: add something to authenticate here?
  }

  public create(player: Player): void {
    this.players.push(player);
  }

  public deletePlayer(id: number): string | Error {
    const index = this.players.findIndex(element => {
      return element.id === id;
    });

    if (index === -1) {
      throw new Error('player not found');
    }

    return `player ${id} deleted`;
  }

  public async findAll(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  public findOne(id: number): Player | Error {
    const player = this.players.find(element => {
      return element.id === id;
    });

    if (_.isNil(player)) {
      throw new Error('player not found');
    }

    return player;
  }
}
