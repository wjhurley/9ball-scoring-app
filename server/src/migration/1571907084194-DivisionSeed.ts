import { Logger } from '@nestjs/common';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { DivisionSeed } from '../seed/division.seed';

export class DivisionSeed1571907084194 implements MigrationInterface {
  private logger = new Logger('DivisionSeed');

  public async up(queryRunner: QueryRunner): Promise<any> {
    this.logger.log('Starting Division seed...');

    try {
      const divisions = await getRepository('Division').save(DivisionSeed);

      if (divisions) {
        this.logger.log(`Division seed completed successfully, ${divisions.length} rows added.`);
      }
    } catch (error) {
      this.logger.error('Division seed failed', error.stack);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    this.logger.log('Starting Division seed reversion...');

    try {
      const divisions = await queryRunner.query(`DELETE FROM "division"`);
      const rowCount = divisions[1];

      if (divisions) {
        this.logger.log(
          `Division seed reversion completed successfully, ${rowCount} rows removed.`,
        );
      }
    } catch (error) {
      this.logger.error('Division seed reversion failed', error.stack);
    }
  }
}
