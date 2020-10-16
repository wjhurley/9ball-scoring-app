import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

import { User } from '../auth/user.entity';
import { DivisionRepository } from '../division/division.repository';
import { HostLocationRepository } from '../host-location/host-location.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamsFilterDto } from './dto/get-teams-filter.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './team.entity';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(DivisionRepository)
    private divisionRepository: DivisionRepository,
    @InjectRepository(HostLocationRepository)
    private hostLocationRepository: HostLocationRepository,
    @InjectRepository(TeamRepository)
    private teamRepository: TeamRepository,
  ) {}

  public async createTeam(createTeamDto: CreateTeamDto, user: User): Promise<Team> {
    const { division, format, hostLocation, teamName, teamNumber } = createTeamDto;
    const relatedDivision = await this.divisionRepository.getDivision(division);
    const relatedHostLocation = await this.hostLocationRepository.getHostLocation(hostLocation);

    if (_.isUndefined(relatedDivision)) {
      throw new NotFoundException(`Division "${division}" not found`);
    }

    if (_.isUndefined(relatedHostLocation)) {
      throw new NotFoundException(`Host Location "${hostLocation}" not found`);
    }

    if (format !== relatedDivision.format) {
      throw new UnprocessableEntityException(
        `Team format "${format}" does not match Division format`,
      );
    }

    createTeamDto.division = relatedDivision;
    createTeamDto.format = format;
    createTeamDto.hostLocation = relatedHostLocation;
    createTeamDto.teamName = teamName;
    createTeamDto.teamNumber = teamNumber;

    return this.teamRepository.createTeam(createTeamDto, user);
  }

  public async deleteTeam(id: number): Promise<void> {
    const result = await this.teamRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Team with ID "${id}" not found`);
    }
  }

  public async getTeamById(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({
      relations: ['division', 'hostLocation'],
      where: { id },
    });

    if (_.isUndefined(team)) {
      throw new NotFoundException(`Team with ID "${id}" not found`);
    }

    return team;
  }

  public async getTeams(filterDto: GetTeamsFilterDto, user: User): Promise<Team[]> {
    return this.teamRepository.getTeams(filterDto, user);
  }

  public async updateTeam(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const { division, format, hostLocation, teamName, teamNumber } = updateTeamDto;
    const team = await this.getTeamById(id);

    team.division = division || team.division;
    team.format = format || team.format;
    team.hostLocation = hostLocation || team.hostLocation;
    team.teamName = teamName || team.teamName;
    team.teamNumber = teamNumber || team.teamNumber;
    team.updatedAt = new Date(Date.now());

    await team.save();
    return team;
  }
}
