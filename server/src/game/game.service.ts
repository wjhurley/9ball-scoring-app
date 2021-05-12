import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

import { User } from '../auth/user.entity';
import { Game } from './game.entity';
import { GameRepository } from './game.repository';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGamesFilterDto } from './dto/get-games-filter.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameRepository)
    private gameRepository: GameRepository,
  ) {}

  public async createGame(createGameDto: CreateGameDto, user: User): Promise<Game> {
    return this.gameRepository.createGame(createGameDto, user);
  }

  public async deleteGame(id: number): Promise<void> {
    const result = await this.gameRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Game with ID "${id}" not found`);
    }
  }

  public async getGameById(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne({ where: { id } });

    if (_.isUndefined(game)) {
      throw new NotFoundException(`Game with ID "${id}" not found`);
    }

    return game;
  }

  public async getGames(filterDto: GetGamesFilterDto): Promise<Game[]> {
    return this.gameRepository.getGames(filterDto);
  }

  public async updateGame(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const { deadBalls, endTime, innings, match, postSeason, startTime } = updateGameDto;
    const game = await this.getGameById(id);

    game.deadBalls = deadBalls || game.deadBalls;
    game.endTime = endTime || game.endTime;
    game.innings = innings || game.innings;
    game.match = match || game.match;
    game.postSeason = postSeason ?? game.postSeason;
    game.startTime = startTime || game.startTime;
    game.updatedAt = new Date(Date.now());

    await game.save();
    return game;
  }
}
