import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

import { PlayerRepository } from '../player/player.repository';
import { TeamRepository } from '../team/team.repository';
import { PlayerTeamRepository } from './player-team.repository';

import type { User } from '../auth/user.entity';
import type { CreatePlayerTeamDto } from './dto/create-player-team.dto';
import type { GetPlayerTeamsFilterDto } from './dto/get-player-teams-filter.dto';
import type { UpdatePlayerTeamDto } from './dto/update-player-team.dto';
import type { PlayerTeam } from './player-team.entity';

@Injectable()
export class PlayerTeamService {
  constructor(
    @InjectRepository(PlayerRepository)
    private playerRepository: PlayerRepository,
    @InjectRepository(PlayerTeamRepository)
    private playerTeamRepository: PlayerTeamRepository,
    @InjectRepository(TeamRepository)
    private teamRepository: TeamRepository,
  ) {}

  public async createPlayerTeam(
    createPlayerTeamDto: CreatePlayerTeamDto,
    user: User,
  ): Promise<PlayerTeam> {
    const { player, team } = createPlayerTeamDto;
    const relatedPlayer = await this.playerRepository.getPlayer(player);
    const relatedTeam = await this.teamRepository.getTeam(team);

    if (_.isUndefined(relatedPlayer)) {
      throw new NotFoundException(`Player "${player}" not found`);
    }

    if (_.isUndefined(relatedTeam)) {
      throw new NotFoundException(`Team "${team}" not found`);
    }

    if (relatedTeam.format !== relatedPlayer.format) {
      throw new UnprocessableEntityException(
        `Player format "${relatedPlayer.format}" does not match Team format`,
      );
    }

    const teamsInSameDivision = await this.teamRepository
      .createQueryBuilder('team')
      .select('team.id')
      .where('team.division = :division', { division: relatedTeam.division.id })
      .getMany();
    const teamIds = teamsInSameDivision.map(team => team.id);
    const playersOnTeamsInSameDivision = await this.playerTeamRepository
      .createQueryBuilder('player_team')
      .select('player_team.id')
      .addSelect('player.id')
      .addSelect('team.id')
      .innerJoin('player_team.player', 'player')
      .innerJoin('player_team.team', 'team')
      .where('player_team.team IN (:...teams)', { teams: teamIds })
      .getMany();
    const isPlayerAlreadyOnTeam = playersOnTeamsInSameDivision.some(
      playerTeam =>
        playerTeam.player.id === relatedPlayer.id && playerTeam.team.id === relatedTeam.id,
    );
    const isPlayerOnAnotherTeam = playersOnTeamsInSameDivision.some(
      playerTeam => playerTeam.player.id === relatedPlayer.id,
    );

    if (isPlayerAlreadyOnTeam) {
      throw new ConflictException('Player is already on this team!');
    }

    if (isPlayerOnAnotherTeam) {
      throw new ConflictException('Player is already on another team in the same division');
    }

    createPlayerTeamDto.player = relatedPlayer;
    createPlayerTeamDto.team = relatedTeam;

    return this.playerTeamRepository.createPlayerTeam(createPlayerTeamDto, user);
  }

  public async deletePlayerTeam(id: number): Promise<void> {
    const result = await this.playerTeamRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`PlayerTeam with ID "${id}" not found`);
    }
  }

  public async getPlayerTeamById(id: number): Promise<PlayerTeam> {
    const playerTeam = await this.playerTeamRepository.findOne({
      relations: ['player', 'team'],
      where: { id },
    });

    if (_.isUndefined(playerTeam)) {
      throw new NotFoundException(`PlayerTeam with ID "${id}" not found`);
    }

    return playerTeam;
  }

  public async getPlayerTeams(
    filterDto: GetPlayerTeamsFilterDto,
    user: User,
  ): Promise<PlayerTeam[]> {
    return this.playerTeamRepository.getPlayerTeams(filterDto, user);
  }

  public async updatePlayerTeam(
    id: number,
    updatePlayerTeamDto: UpdatePlayerTeamDto,
  ): Promise<PlayerTeam> {
    const { captain, coCaptain } = updatePlayerTeamDto;
    const playerTeam = await this.getPlayerTeamById(id);
    const teamCaptain = await this.playerTeamRepository
      .createQueryBuilder('player_team')
      .select('player_team.captain')
      .addSelect('player.id')
      .innerJoin('player_team.player', 'player')
      .where('player_team.team = :team', { team: playerTeam.team.id })
      .andWhere('player_team.captain = :captain', { captain: true })
      .getOne();
    const teamCoCaptain = await this.playerTeamRepository
      .createQueryBuilder('player_team')
      .select('player_team.coCaptain')
      .addSelect('player.id')
      .innerJoin('player_team.player', 'player')
      .where('player_team.team = :team', { team: playerTeam.team.id })
      .andWhere('player_team.coCaptain = :coCaptain', { coCaptain: true })
      .getOne();

    if (
      !_.isNil(captain) &&
      captain &&
      teamCaptain &&
      teamCaptain.player.id !== playerTeam.player.id
    ) {
      throw new ConflictException('Only one player can be set as the captain for this team');
    }

    if (
      !_.isNil(coCaptain) &&
      coCaptain &&
      teamCoCaptain &&
      teamCoCaptain.player.id !== playerTeam.player.id
    ) {
      throw new ConflictException('Only one player can be set as the co-captain for this team');
    }

    playerTeam.captain = captain ?? playerTeam.captain;
    playerTeam.coCaptain = coCaptain ?? playerTeam.coCaptain;
    playerTeam.updatedAt = new Date(Date.now());

    await playerTeam.save();
    return playerTeam;
  }
}
