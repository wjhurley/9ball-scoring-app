import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { GetPlayersFilterDto } from './dto/get-players-filter.dto';
import { Player } from './player.entity';

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {
  private logger = new Logger('PlayerRepository');

  public async createPlayer(createPlayerDto: CreatePlayerDto, user: User): Promise<Player> {
    const { playerNumber, format, skillLevel } = createPlayerDto;

    const player = new Player();
    player.format = format;
    player.playerNumber = playerNumber;
    player.skillLevel = skillLevel;
    player.userId = user;

    try {
      await player.save();
    } catch (error) {
      this.logger.error(
        `Failed to create player for user "${user.email}". Data: ${JSON.stringify(
          createPlayerDto,
        )}`,
        error.stack,
      );

      if (error.code === '23505') {
        throw new ConflictException('Player number/format combination already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    // delete player.userId; // doesn't work with TS 4.0.2
    return player;
  }

  public async getPlayers(filterDto: GetPlayersFilterDto, user: User): Promise<Player[]> {
    const { format } = filterDto;
    const query = this.createQueryBuilder('player');

    query.where('player.userId = :userId', { userId: user.id });

    if (format) {
      query.andWhere('player.format = :format', { format });
    }

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get player info for user "${user.email}". Format: ${JSON.stringify(format)}`,
        error.stack,
      );
      throw new NotFoundException();
    }
  }
}
