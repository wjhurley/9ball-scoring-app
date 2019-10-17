import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { GetPlayerInfoDto } from './dto/get-player-info.dto';
import { Player } from './player.entity';

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {
  private logger = new Logger('PlayerRepository');

  public async createPlayer(createPlayerDto: CreatePlayerDto, user: User): Promise<Player> {
    const { playerNumber, format, skillLevel } = createPlayerDto;

    const player = new Player();
    player.playerNumber = playerNumber;
    player.format = format;
    player.skillLevel = skillLevel;
    player.userId = user;

    try {
      await player.save();
    } catch (error) {
      this.logger.error(
        `Failed to create player info for user "${user.email}". Data: ${JSON.stringify(
          createPlayerDto,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete player.userId;
    return player;
  }

  public async getPlayerInfo(format: GetPlayerInfoDto, user: User): Promise<Player[]> {
    const query = this.createQueryBuilder('player');

    query.where('player.userId = :userId', { userId: user.id });

    if (format) {
      query.andWhere('player.format = :format', { format });
    }

    try {
      const players = await query.getMany();
      return players;
    } catch (error) {
      this.logger.error(
        `Failed to get player info for user "${user.email}". Format: ${JSON.stringify(format)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
