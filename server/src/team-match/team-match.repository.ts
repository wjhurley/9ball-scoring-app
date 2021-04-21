import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { duplicateEntryErrorCode } from '../auth/user.repository';
import { CreateTeamMatchDto } from './dto/create-team-match.dto';
import { GetTeamMatchesFilterDto } from './dto/get-team-matches-filter.dto';
import { TeamMatch } from './team-match.entity';

@EntityRepository(TeamMatch)
export class TeamMatchRepository extends Repository<TeamMatch> {
  private logger = new Logger('TeamMatchRepository');

  public async createTeamMatch(
    createTeamMatchDto: CreateTeamMatchDto,
    user: User,
  ): Promise<TeamMatch> {
    const { match, team } = createTeamMatchDto;

    const teamMatch = new TeamMatch();
    teamMatch.match = match;
    teamMatch.team = team;

    try {
      await teamMatch.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a team match for user "${user.email}". Data: ${JSON.stringify(
          createTeamMatchDto,
        )}`,
        error.stack,
      );
      // TODO: Make sure that this error is still the same when it's a primary key violation and not uniqueness violation
      if (error.code === duplicateEntryErrorCode) {
        throw new ConflictException('TeamMatch team/match combination already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return teamMatch;
  }

  public async getTeamMatches(
    getTeamMatchesFilterDto: GetTeamMatchesFilterDto,
    user: User,
  ): Promise<TeamMatch[]> {
    const { homeTeam, match, team, won } = getTeamMatchesFilterDto;
    const query = this.createQueryBuilder('team_match')
      .innerJoinAndSelect('team_match.match', 'match')
      .innerJoinAndSelect('team_match.team', 'team');

    if (homeTeam) {
      query.where('team_match.homeTeam = :homeTeam', { homeTeam });
    } else if (match) {
      query.where('team_match.match = :match', { match });
    } else if (team) {
      query.where('team_match.team = :team', { team });
    } else if (won) {
      query.where('team_match.won = :won', { won });
    }

    try {
      return query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get team matches for user "${user.email}". Filters: ${JSON.stringify(
          getTeamMatchesFilterDto,
        )}`,
        error.stack,
      );
      throw new NotFoundException();
    }
  }
}
