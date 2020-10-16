import { Logger } from '@nestjs/common';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { TeamSeed } from '../seed/team.seed';

export class TeamSeed1571907084194 implements MigrationInterface {
  private logger = new Logger('TeamSeed');

  public async up(queryRunner: QueryRunner): Promise<any> {
    this.logger.log('Starting Team seed...');

    try {
      const teams = await getRepository('Team').save(TeamSeed);

      if (teams) {
        this.logger.log(`Team seed completed successfully, ${teams.length} rows added.`);
      }
    } catch (error) {
      this.logger.error('Team seed failed', error.stack);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    this.logger.log('Starting Team seed reversion...');

    try {
      const teams = await queryRunner.query(`DELETE FROM "team"`);
      const rowCount = teams[1];

      if (teams) {
        this.logger.log(`Team seed reversion completed successfully, ${rowCount} rows removed.`);
      }
    } catch (error) {
      this.logger.error('Team seed reversion failed', error.stack);
    }
  }
}
