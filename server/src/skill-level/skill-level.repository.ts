import { Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { GetSkillLevelDto } from './dto/get-skill-level.dto';
import { SkillLevel } from './skill-level.entity';

@EntityRepository(SkillLevel)
export class SkillLevelRepository extends Repository<SkillLevel> {
  private logger = new Logger('SkillLevelRepository');

  public async getSkillLevel(getSkillLevelDto: GetSkillLevelDto): Promise<SkillLevel | undefined> {
    const { format, skillLevel } = getSkillLevelDto;

    try {
      return await this.createQueryBuilder('skill_level')
        .where('skill_level.format = :format AND skill_level.skill_level = :skillLevel', {
          format,
          skillLevel,
        })
        .getOne();
    } catch (error) {
      this.logger.error(
        `Failed to get skill-level info. Arguments: ${JSON.stringify(getSkillLevelDto)}`,
        error.stack,
      );
      throw new NotFoundException();
    }
  }
}
