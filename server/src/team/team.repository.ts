import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { duplicateEntryErrorCode } from '../auth/user.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamsFilterDto } from './dto/get-teams-filter.dto';
import { Team } from './team.entity';

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
  private logger = new Logger('TeamRepository');

  public async createTeam(createTeamDto: CreateTeamDto, user: User): Promise<Team> {
    const { division, format, hostLocation, teamName, teamNumber } = createTeamDto;

    const team = new Team();
    team.division = division;
    team.format = format;
    team.hostLocation = hostLocation;
    team.teamName = teamName;
    team.teamNumber = teamNumber;

    try {
      await team.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a team for user "${user.email}". Data: ${JSON.stringify(createTeamDto)}`,
        error.stack,
      );

      if (error.code === duplicateEntryErrorCode) {
        throw new ConflictException('Team name/division combination already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return team;
  }

  public async getTeams(getTeamsFilterDto: GetTeamsFilterDto, user: User): Promise<Team[]> {
    const { division, format, hostLocation } = getTeamsFilterDto;
    const query = this.createQueryBuilder('team')
      .leftJoinAndSelect('team.division', 'division')
      .leftJoinAndSelect('team.hostLocation', 'hostLocation');

    if (division) {
      query.where('team.division = :division', { division });
    } else if (format) {
      query.where('team.format = :format', { format });
    } else if (hostLocation) {
      query.where('team.host_location = :hostLocation', { hostLocation });
    }

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get teams for user "${user.email}". Filters: ${JSON.stringify(
          getTeamsFilterDto,
        )}`,
        error.stack,
      );
      throw new NotFoundException();
    }
  }
}
