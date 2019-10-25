import { Logger } from '@nestjs/common';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { SkillLevelSeed } from '../seed/skill-level.seed';

export class SkillLevelSeed1571907084193 implements MigrationInterface {
  private logger = new Logger('SkillLevelSeed');

  public async up(queryRunner: QueryRunner): Promise<any> {
    this.logger.log('Starting SkillLevel seed...');

    try {
      const skillLevels = await getRepository('SkillLevel').save(SkillLevelSeed);

      if (skillLevels) {
        this.logger.log(
          `SkillLevel seed completed successfully, ${skillLevels.length} rows added.`,
        );
      }
    } catch (error) {
      this.logger.error('SkillLevel seed failed', error.stack);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    this.logger.log('Starting SkillLevel seed reversion...');

    try {
      const skillLevels = await queryRunner.query(`DELETE FROM "skill_level"`);
      const rowCount = skillLevels[1];

      if (skillLevels) {
        this.logger.log(
          `SkillLevel seed reversion completed successfully, ${rowCount} rows removed.`,
        );
      }
    } catch (error) {
      this.logger.error('SkillLevel seed reversion failed', error.stack);
    }
  }
}
