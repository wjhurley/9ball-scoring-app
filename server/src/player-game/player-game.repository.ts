import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { duplicateEntryErrorCode } from '../auth/user.repository';
import { CreatePlayerGameDto } from './dto/create-player-game.dto';
import { GetPlayerGamesFilterDto } from './dto/get-player-games-filter.dto';
import { PlayerGame } from './player-game.entity';

@EntityRepository(PlayerGame)
export class PlayerGameRepository extends Repository<PlayerGame> {
  private logger = new Logger('PlayerGameRepository');

  public async createPlayerGame(
    createPlayerGameDto: CreatePlayerGameDto,
    user: User,
  ): Promise<PlayerGame> {
    const { game, player } = createPlayerGameDto;

    const playerGame = new PlayerGame();
    playerGame.game = game;
    playerGame.player = player;

    try {
      await playerGame.save();
    } catch (error) {
      this.logger.error(
        `Failed to create player game for user "${user.email}". Data: ${JSON.stringify(
          createPlayerGameDto,
        )}`,
        error.stack,
      );
      // TODO: Make sure that this error is still the same when it's a primary key violation and not uniqueness violation
      if (error.code === duplicateEntryErrorCode) {
        throw new ConflictException('PlayerGame player/game combination already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return playerGame;
  }

  public async getPlayerGames(
    getPlayerGamesFilterDto: GetPlayerGamesFilterDto,
    user: User,
  ): Promise<PlayerGame[]> {
    const { game, player } = getPlayerGamesFilterDto;
    const query = this.createQueryBuilder('player_game')
      .innerJoinAndSelect('player_game.player', 'player')
      .innerJoinAndSelect('player_game.game', 'game');

    if (game) {
      query.where('player_game.game = :game', { game });
    } else if (player) {
      query.where('player_game.player = :player', { player });
    }

    try {
      return query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get player games for user "${user.email}". Filters: ${JSON.stringify(
          getPlayerGamesFilterDto,
        )}`,
        error.stack,
      );
      throw new NotFoundException();
    }
  }
}
