import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

import { User } from '../auth/user.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { GetPlayerInfoDto } from './dto/get-player-info.dto';
import { Player } from './player.entity';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerRepository)
    private playerRepository: PlayerRepository,
  ) {}

  public createPlayer(createPlayerDto: CreatePlayerDto, user: User): Promise<Player> {
    return this.playerRepository.createPlayer(createPlayerDto, user);
  }

  public getPlayerInfo(format: GetPlayerInfoDto, user: User): Promise<Player[]> {
    return this.playerRepository.getPlayerInfo(format, user);
  }
}
