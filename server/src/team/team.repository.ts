import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamsFilterDto } from './dto/get-teams-filter.dto';
import { Team } from './team.entity';

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
  private logger = new Logger('TeamRepository');

  public async createTeam(createTeamDto: CreateTeamDto, user: User): Promise<Team> {
    const { teamName, teamNumber } = createTeamDto;

    const team = new Team();
    team.teamName = teamName;
    team.teamNumber = teamNumber;

    try {
      await team.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a team for user "${user.email}". Data: ${JSON.stringify(createTeamDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return team;
  }

  public async getTeams(getTeamsFilterDto: GetTeamsFilterDto, user: User): Promise<Team[]> {
    const { division } = getTeamsFilterDto;
    const query = this.createQueryBuilder('team');

    if (division) {
      query.where('team.division = :division', { division });
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
      throw new InternalServerErrorException();
    }
  }
}
