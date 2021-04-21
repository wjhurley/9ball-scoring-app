import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { duplicateEntryErrorCode } from '../auth/user.repository';
import { CreatePlayerTeamDto } from './dto/create-player-team.dto';
import { GetPlayerTeamsFilterDto } from './dto/get-player-teams-filter.dto';
import { PlayerTeam } from './player-team.entity';

@EntityRepository(PlayerTeam)
export class PlayerTeamRepository extends Repository<PlayerTeam> {
  private logger = new Logger('PlayerTeamRepository');

  public async createPlayerTeam(
    createPlayerTeamDto: CreatePlayerTeamDto,
    user: User,
  ): Promise<PlayerTeam> {
    const { captain, coCaptain, player, team } = createPlayerTeamDto;

    const playerTeam = new PlayerTeam();
    playerTeam.captain = captain;
    playerTeam.coCaptain = coCaptain;
    playerTeam.player = player;
    playerTeam.team = team;

    try {
      await playerTeam.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a player team for user "${user.email}". Data: ${JSON.stringify(
          createPlayerTeamDto,
        )}`,
        error.stack,
      );
      // TODO: Make sure that this error is still the same when it's a primary key violation and not uniqueness violation
      if (error.code === duplicateEntryErrorCode) {
        throw new ConflictException('PlayerTeam player/team combination already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return playerTeam;
  }

  public async getPlayerTeams(
    getPlayerTeamsFilterDto: GetPlayerTeamsFilterDto,
    user: User,
  ): Promise<PlayerTeam[]> {
    const { captain, coCaptain, player, team } = getPlayerTeamsFilterDto;
    const query = this.createQueryBuilder('player_team')
      .innerJoinAndSelect('player_team.player', 'player')
      .innerJoinAndSelect('player_team.team', 'team');

    if (captain) {
      query.where('player_team.captain = :captain', { captain });
    } else if (coCaptain) {
      query.where('player_team.coCaptain = :coCaptain', { coCaptain });
    } else if (player) {
      query.where('player_team.player = :player', { player });
    } else if (team) {
      query.where('player_team.team = :team', { team });
    }

    try {
      return query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get player teams for user "${user.email}". Filters: ${JSON.stringify(
          getPlayerTeamsFilterDto,
        )}`,
        error.stack,
      );
      throw new NotFoundException();
    }
  }
}
