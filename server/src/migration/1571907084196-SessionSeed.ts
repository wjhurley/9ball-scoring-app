import { Logger } from '@nestjs/common';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { SessionSeed } from '../seed/session.seed';

export class SessionSeed1571907084196 implements MigrationInterface {
  private logger = new Logger('SessionSeed');

  public async up(queryRunner: QueryRunner): Promise<any> {
    this.logger.log('Starting Session seed...');

    try {
      const sessions = await getRepository('Session').save(SessionSeed);

      if (sessions) {
        this.logger.log(`Session seed completed successfully, ${sessions.length} rows added.`);
      }
    } catch (error) {
      this.logger.error('Session seed failed', error.stack);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    this.logger.log('Starting Session seed reversion...');

    try {
      const sessions = await queryRunner.query(`DELETE FROM "session"`);
      const rowCount = sessions[1];

      if (sessions) {
        this.logger.log(`Session seed reversion completed successfully, ${rowCount} rows removed.`);
      }
    } catch (error) {
      this.logger.error('Session seed reversion failed', error.stack);
    }
  }
}
