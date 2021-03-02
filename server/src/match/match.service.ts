import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

import { Match } from './match.entity';
import { MatchRepository } from './match.repository';
import { CreateMatchDto } from './dto/create-match.dto';
import { GetMatchesFilterDto } from './dto/get-matches-filter.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(MatchRepository)
    private matchRepository: MatchRepository,
  ) {}

  public async createMatch(createMatchDto: CreateMatchDto): Promise<Match> {
    return this.matchRepository.createMatch(createMatchDto);
  }

  public async deleteMatch(id: number): Promise<void> {
    const result = await this.matchRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Match with ID "${id}" not found`);
    }
  }

  public async getMatchById(id: number): Promise<Match> {
    const match = await this.matchRepository.findOne({ where: { id } });

    if (_.isUndefined(match)) {
      throw new NotFoundException(`Match with ID "${id}" not found`);
    }

    return match;
  }

  public async getMatches(filterDto: GetMatchesFilterDto): Promise<Match[]> {
    return this.matchRepository.getMatches(filterDto);
  }

  public async updateMatch(id: number, updateMatchDto: UpdateMatchDto): Promise<Match> {
    const { endTime, matchDate, postSeason, session, startTime, weekNumber } = updateMatchDto;
    const match = await this.getMatchById(id);

    match.endTime = endTime || match.endTime;
    match.matchDate = matchDate || match.matchDate;
    match.postSeason = postSeason ?? match.postSeason;
    match.session = session || match.session;
    match.startTime = startTime || match.startTime;
    match.weekNumber = weekNumber || match.weekNumber;
    match.updatedAt = new Date(Date.now());

    await match.save();
    return match;
  }
}
