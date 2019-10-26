import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

import { User } from '../auth/user.entity';
import { SkillLevelRepository } from '../skill-level/skill-level.repository';
import { CreatePlayerDto } from './dto/create-player.dto';
import { GetPlayersFilterDto } from './dto/get-players-filter.dto';
import { UpdatePlayerSkillLevelDto } from './dto/update-player-skill-level.dto';
import { Player } from './player.entity';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerRepository)
    private playerRepository: PlayerRepository,
    @InjectRepository(SkillLevelRepository)
    private skillLevelRepository: SkillLevelRepository,
  ) {}

  public async createPlayer(createPlayerDto: CreatePlayerDto, user: User): Promise<Player> {
    const { format, skillLevel } = createPlayerDto;
    const initialSkillLevel = await this.skillLevelRepository.findSkillLevel({
      format,
      skillLevel,
    });

    if (_.isUndefined(initialSkillLevel)) {
      throw new NotFoundException(`Skill level "${skillLevel}" not valid for format "${format}"`);
    }

    createPlayerDto.skillLevel = initialSkillLevel;

    return this.playerRepository.createPlayer(createPlayerDto, user);
  }

  public async deletePlayer(id: number, user: User): Promise<void> {
    const result = await this.playerRepository.delete({ id, userId: user });

    if (result.affected === 0) {
      throw new NotFoundException(`Player with ID "${id}" not found`);
    }
  }

  public async getPlayerById(id: number, user: User): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id, userId: user } });

    if (_.isUndefined(player)) {
      throw new NotFoundException(`Player with ID "${id}" not found`);
    }

    return player;
  }

  public async getPlayers(filterDto: GetPlayersFilterDto, user: User): Promise<Player[]> {
    return this.playerRepository.getPlayers(filterDto, user);
  }

  public async updatePlayerSkillLevel(
    id: number,
    updatePlayerSkillLevelDto: UpdatePlayerSkillLevelDto,
    user: User,
  ): Promise<Player> {
    const { format, skillLevel } = updatePlayerSkillLevelDto;
    const player = await this.getPlayerById(id, user);
    const newSkillLevel = await this.skillLevelRepository.findSkillLevel(updatePlayerSkillLevelDto);

    if (_.isUndefined(newSkillLevel)) {
      throw new NotFoundException(`Skill level "${skillLevel}" not valid for format "${format}"`);
    }

    if (player.format !== newSkillLevel.format) {
      throw new UnprocessableEntityException(`Format "${format}" does not match player format`);
    }

    player.skillLevel = newSkillLevel;
    player.updatedAt = new Date(Date.now());

    await player.save();
    return player;
  }
}
