import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

import { PlayerRepository } from '../player/player.repository';
import { GameRepository } from '../game/game.repository';
import { PlayerGameRepository } from './player-game.repository';

import type { User } from '../auth/user.entity';
import type { CreatePlayerGameDto } from './dto/create-player-game.dto';
import type { GetPlayerGamesFilterDto } from './dto/get-player-games-filter.dto';
import type { UpdatePlayerGameDto } from './dto/update-player-game.dto';
import type { PlayerGame } from './player-game.entity';

@Injectable()
export class PlayerGameService {
  constructor(
    @InjectRepository(PlayerRepository)
    private playerRepository: PlayerRepository,
    @InjectRepository(PlayerGameRepository)
    private playerGameRepository: PlayerGameRepository,
    @InjectRepository(GameRepository)
    private gameRepository: GameRepository,
  ) {}

  public async createPlayerGame(
    createPlayerGameDto: CreatePlayerGameDto,
    user: User,
  ): Promise<PlayerGame> {
    const { game, player } = createPlayerGameDto;
    const relatedGame = await this.gameRepository.getGame(game);
    const relatedPlayer = await this.playerRepository.getPlayer(player);

    if (_.isUndefined(relatedGame)) {
      throw new NotFoundException(`Game "${game}" not found`);
    }

    if (_.isUndefined(relatedPlayer)) {
      throw new NotFoundException(`Player "${player}" not found`);
    }
    // TODO: Finish hammering out this f'd up relation to get the PlayerTeam and Team info
    const otherPlayerInGame = await this.playerGameRepository
      .createQueryBuilder('player_game')
      .select('player_game.id')
      .addSelect('player.format')
      .addSelect('player_team.id')
      .addSelect('team.id')
      .addSelect('game.id')
      .addSelect('match.id')
      .addSelect('team_match.id')
      .innerJoin('player_game.player', 'player')
      .innerJoin('player_game.game', 'game')
      .innerJoin('game.match', 'match')
      .innerJoin('match.teams', 'team_match')
      .innerJoin('team_match.team', 'team')
      .innerJoin('player.teams', 'player_team')
      .where('player_game.game = :game', { game: relatedGame.id })
      .andWhere('player_game.player != :player', { player: relatedPlayer.id })
      .andWhere('player_team.team.id = team.id')
      .getOne();
    const arePlayersOnTheSameTeam = relatedPlayer.teams.some(
      ({ team }) => team.id === otherPlayerInGame?.game.match.teams[0].team.id,
    );
    // TODO: Add logic to compare list of teams in match with list of teams relatedPlayer is in to ensure player's team is not already in this game
    if (
      !_.isUndefined(otherPlayerInGame) &&
      otherPlayerInGame.player.format !== relatedPlayer.format
    ) {
      throw new UnprocessableEntityException(`Player's format does not match other player in game`);
    }

    if (arePlayersOnTheSameTeam) {
      throw new UnprocessableEntityException('Both players are on the same team!');
    }

    const playerGamesInSameMatch = await this.playerGameRepository
      .createQueryBuilder('player_game')
      .select('player_game.id')
      .addSelect('game.id')
      .addSelect('player.id')
      .addSelect('match.id')
      .innerJoin('player_game.game', 'game')
      .innerJoin('player_game.player', 'player')
      .innerJoin('game.match', 'match')
      .where('game.match = :match', { match: relatedGame.match.id })
      .getMany();
    const isPlayerAlreadyInGame = playerGamesInSameMatch.some(
      playerGame =>
        playerGame.game.id === relatedGame.id && playerGame.player.id === relatedPlayer.id,
    );
    const playerGamesForRelatedPlayer = playerGamesInSameMatch.filter(
      playerGame => playerGame.player.id === relatedPlayer.id,
    );
    const hasPlayerAlreadyPlayedTwice = playerGamesForRelatedPlayer.length === 2;
    const playerGamesForRelatedGame = playerGamesInSameMatch.filter(
      playerGame => playerGame.game.id === relatedGame.id,
    );
    const doesGameAlreadyHaveTwoPlayers = playerGamesForRelatedGame.length === 2;

    if (isPlayerAlreadyInGame) {
      throw new ConflictException('Player is already in this game!');
    }

    if (hasPlayerAlreadyPlayedTwice) {
      throw new ConflictException('Player has already played 2 games in this match');
    }

    if (doesGameAlreadyHaveTwoPlayers) {
      throw new ConflictException('There are already 2 players in this game');
    }

    createPlayerGameDto.game = relatedGame;
    createPlayerGameDto.player = relatedPlayer;

    return this.playerGameRepository.createPlayerGame(createPlayerGameDto, user);
  }

  public async deletePlayerGame(id: number): Promise<void> {
    const result = await this.playerGameRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`PlayerGame with ID "${id}" not found`);
    }
  }

  public async getPlayerGameById(id: number): Promise<PlayerGame> {
    const playerGame = await this.playerGameRepository.findOne({
      relations: ['game', 'player'],
      where: { id },
    });

    if (_.isUndefined(playerGame)) {
      throw new NotFoundException(`PlayerGame with ID "${id}" not found`);
    }

    return playerGame;
  }

  public async getPlayerGames(
    filterDto: GetPlayerGamesFilterDto,
    user: User,
  ): Promise<PlayerGame[]> {
    return this.playerGameRepository.getPlayerGames(filterDto, user);
  }

  public async updatePlayerGame(
    id: number,
    updatePlayerGameDto: UpdatePlayerGameDto,
  ): Promise<PlayerGame> {
    const {
      breakAndRun,
      defense,
      nineOnSnap,
      playerScore,
      pointsScored,
      skunk,
      won,
    } = updatePlayerGameDto;
    const playerGame = await this.getPlayerGameById(id);
    const otherPlayerInGame = await this.playerGameRepository
      .createQueryBuilder('player_game')
      .select('player_game.skunk')
      .addSelect('player_game.won')
      .where('player_game.game = :game', { game: playerGame.game.id })
      .andWhere('player_game.player != :player', { player: playerGame.player.id })
      .getOne();

    if (!_.isNil(skunk) && skunk && otherPlayerInGame?.skunk === skunk) {
      throw new ConflictException('Only one player can achieve a skunk for this game');
    }

    if (!_.isNil(won) && won && otherPlayerInGame?.won === won) {
      throw new ConflictException('Only one player can be set as the winner for this game');
    }

    playerGame.breakAndRun = breakAndRun || playerGame.breakAndRun;
    playerGame.defense = defense || playerGame.defense;
    playerGame.nineOnSnap = nineOnSnap || playerGame.nineOnSnap;
    playerGame.playerScore = playerScore || playerGame.playerScore;
    playerGame.pointsScored = pointsScored || playerGame.pointsScored;
    playerGame.skunk = skunk ?? playerGame.skunk;
    playerGame.updatedAt = new Date(Date.now());
    playerGame.won = won ?? playerGame.won;

    await playerGame.save();
    return playerGame;
  }
}
