import { Logger } from '@nestjs/common';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { MatchSeed } from '../seed/match.seed';

export class MatchSeed1571907084200 implements MigrationInterface {
  private logger = new Logger('MatchSeed');

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting Match seed...');

    try {
      const matches = await getRepository('Match').save(MatchSeed);

      if (matches) {
        this.logger.log(`Match seed completed successfully, ${matches.length} rows added.`);
      }
    } catch (error) {
      this.logger.error('Match seed failed', error.stack);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting Match seed reversion...');

    try {
      const matches = await queryRunner.query('DELETE FROM "player_team"');
      const rowCount = matches[1];

      if (matches) {
        this.logger.log(`Match seed reversion completed successfully, ${rowCount} rows removed.`);
      }
    } catch (error) {
      this.logger.error('Match seed reversion failed', error.stack);
    }
  }
}
