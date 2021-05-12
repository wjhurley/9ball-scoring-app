import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

import { TeamRepository } from '../team/team.repository';
import { MatchRepository } from '../match/match.repository';
import { TeamMatchRepository } from './team-match.repository';

import type { User } from '../auth/user.entity';
import type { CreateTeamMatchDto } from './dto/create-team-match.dto';
import type { GetTeamMatchesFilterDto } from './dto/get-team-matches-filter.dto';
import type { UpdateTeamMatchDto } from './dto/update-team-match.dto';
import type { TeamMatch } from './team-match.entity';

@Injectable()
export class TeamMatchService {
  constructor(
    @InjectRepository(TeamRepository)
    private teamRepository: TeamRepository,
    @InjectRepository(TeamMatchRepository)
    private teamMatchRepository: TeamMatchRepository,
    @InjectRepository(MatchRepository)
    private matchRepository: MatchRepository,
  ) {}

  public async createTeamMatch(
    createTeamMatchDto: CreateTeamMatchDto,
    user: User,
  ): Promise<TeamMatch> {
    const { homeTeam, match, team } = createTeamMatchDto;
    const relatedMatch = await this.matchRepository.getMatch(match);
    const relatedTeam = await this.teamRepository.getTeam(team);

    if (_.isUndefined(relatedMatch)) {
      throw new NotFoundException(`Match "${match}" not found`);
    }

    if (_.isUndefined(relatedTeam)) {
      throw new NotFoundException(`Team "${team}" not found`);
    }

    const otherTeamInMatch = await this.teamMatchRepository
      .createQueryBuilder('team_match')
      .select('team_match.homeTeam')
      .addSelect('division.id')
      .innerJoinAndSelect('team_match.team', 'team')
      .innerJoin('team.division', 'division')
      .where('team_match.match = :match', { match: relatedMatch.id })
      .andWhere('team_match.team != :team', { team: relatedTeam.id })
      .getOne();

    if (
      !_.isUndefined(otherTeamInMatch) &&
      otherTeamInMatch.team.division.id !== relatedTeam.division.id
    ) {
      throw new UnprocessableEntityException(`Team's division does not match other team in match`);
    }

    if (otherTeamInMatch?.homeTeam === homeTeam) {
      if (otherTeamInMatch?.homeTeam) {
        throw new ConflictException('Only one team can be set as the home team for this match');
      }

      throw new ConflictException('One of the teams in this match must be set as the home team');
    }

    const teamMatchesForThisWeek = await this.teamMatchRepository
      .createQueryBuilder('team_match')
      .select('team_match.id')
      .addSelect('match.id')
      .addSelect('match.weekNumber')
      .addSelect('team.id')
      .addSelect('division.id')
      .innerJoin('team_match.match', 'match')
      .innerJoin('team_match.team', 'team')
      .innerJoin('team.division', 'division')
      .where('team.division = :division', { division: relatedTeam.division.id })
      .andWhere('match.weekNumber = :weekNumber', { weekNumber: relatedMatch.weekNumber })
      .getMany();
    const isTeamAlreadyInMatch = teamMatchesForThisWeek.some(
      teamMatch => teamMatch.match.id === relatedMatch.id && teamMatch.team.id === relatedTeam.id,
    );
    const isTeamAlreadyPlayingTonight = teamMatchesForThisWeek.some(
      teamMatch => teamMatch.team.id === relatedTeam.id,
    );
    const teamMatchesForRelatedMatch = teamMatchesForThisWeek.filter(
      teamMatch => teamMatch.match.id === relatedMatch.id,
    );
    const doesMatchAlreadyHaveTwoTeams = teamMatchesForRelatedMatch.length === 2;

    if (isTeamAlreadyInMatch) {
      throw new ConflictException('Team is already in this match!');
    }

    if (isTeamAlreadyPlayingTonight) {
      throw new ConflictException('Team is already playing another match tonight');
    }

    if (doesMatchAlreadyHaveTwoTeams) {
      throw new ConflictException('There are already 2 teams in this match');
    }

    createTeamMatchDto.match = relatedMatch;
    createTeamMatchDto.team = relatedTeam;

    return this.teamMatchRepository.createTeamMatch(createTeamMatchDto, user);
  }

  public async deleteTeamMatch(id: number): Promise<void> {
    const result = await this.teamMatchRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`TeamMatch with ID "${id}" not found`);
    }
  }

  public async getTeamMatchById(id: number): Promise<TeamMatch> {
    const teamMatch = await this.teamMatchRepository.findOne({
      relations: ['match', 'team'],
      where: { id },
    });

    if (_.isUndefined(teamMatch)) {
      throw new NotFoundException(`TeamMatch with ID "${id}" not found`);
    }

    return teamMatch;
  }

  public async getTeamMatches(
    filterDto: GetTeamMatchesFilterDto,
    user: User,
  ): Promise<TeamMatch[]> {
    return this.teamMatchRepository.getTeamMatches(filterDto, user);
  }

  public async updateTeamMatch(
    id: number,
    updateTeamMatchDto: UpdateTeamMatchDto,
  ): Promise<TeamMatch> {
    const { forfeits, homeTeam, won } = updateTeamMatchDto;
    const teamMatch = await this.getTeamMatchById(id);
    const otherTeamInMatch = await this.teamMatchRepository
      .createQueryBuilder('team_match')
      .select('team_match.homeTeam')
      .addSelect('team_match.won')
      .where('team_match.match = :match', { match: teamMatch.match.id })
      .andWhere('team_match.team != :team', { team: teamMatch.team.id })
      .getOne();

    if (!_.isNil(homeTeam) && otherTeamInMatch?.homeTeam === homeTeam) {
      if (otherTeamInMatch?.homeTeam) {
        throw new ConflictException('Only one team can be set as the home team for this match');
      }

      throw new ConflictException('One of the teams in this match must be set as the home team');
    }

    if (!_.isNil(won) && won && otherTeamInMatch?.won === won) {
      throw new ConflictException('Only one team can be set as the winner for this match');
    }

    teamMatch.forfeits = forfeits || teamMatch.forfeits;
    teamMatch.homeTeam = homeTeam ?? teamMatch.homeTeam;
    teamMatch.updatedAt = new Date(Date.now());
    teamMatch.won = won ?? teamMatch.won;

    await teamMatch.save();
    return teamMatch;
  }
}
