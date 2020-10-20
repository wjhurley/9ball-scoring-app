import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Match } from './match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { GetMatchesFilterDto } from './dto/get-matches-filter.dto';

@EntityRepository(Match)
export class MatchRepository extends Repository<Match> {
  private logger = new Logger('MatchRepository');

  public async createMatch(createMatchDto: CreateMatchDto): Promise<Match> {
    const { matchDate, postSeason, sessionId, startTime, weekNumber } = createMatchDto;

    const match = new Match();
    match.matchDate = matchDate;
    match.postSeason = postSeason;
    match.sessionId = sessionId;
    match.startTime = startTime;
    match.weekNumber = weekNumber;

    try {
      await match.save();
    } catch (error) {
      this.logger.error(
        `Failed to create match. Data: ${JSON.stringify(createMatchDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return match;
  }

  public async getMatch(match: Match): Promise<Match | undefined> {
    try {
      return await this.createQueryBuilder('match')
        .where('match.id = :id', { id: match })
        .getOne();
    } catch (error) {
      this.logger.error(
        `Failed to get match info. Arguments: ${JSON.stringify(match)}`,
        error.stack,
      );
      throw new NotFoundException();
    }
  }

  public async getMatches(getMatchesDto: GetMatchesFilterDto): Promise<Match[]> {
    const { matchDate, postSeason, sessionId, weekNumber } = getMatchesDto;
    const query = this.createQueryBuilder('match');

    if (matchDate) {
      query.where('match.matchDate = :matchDate', { matchDate });
    } else if (postSeason) {
      query.where('match.postSeason = :postSeason', { postSeason });
    } else if (sessionId) {
      query.where('match.sessionId = :sessionId', { sessionId });
    } else if (weekNumber) {
      query.where('match.weekNumber = :weekNumber', { weekNumber });
    }

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get match info. Arguments: ${JSON.stringify(getMatchesDto)}`,
        error.stack,
      );
      throw new NotFoundException();
    }
  }
}
