import { Logger } from '@nestjs/common';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { HostLocationSeed } from '../seed/host-location.seed';

export class HostLocationSeed1571907084195 implements MigrationInterface {
  private logger = new Logger('HostLocationSeed');

  public async up(queryRunner: QueryRunner): Promise<any> {
    this.logger.log('Starting HostLocation seed...');

    try {
      const hostLocations = await getRepository('HostLocation').save(HostLocationSeed);

      if (hostLocations) {
        this.logger.log(
          `HostLocation seed completed successfully, ${hostLocations.length} rows added.`,
        );
      }
    } catch (error) {
      this.logger.error('HostLocation seed failed', error.stack);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    this.logger.log('Starting HostLocation seed reversion...');

    try {
      const hostLocations = await queryRunner.query(`DELETE FROM "host_location"`);
      const rowCount = hostLocations[1];

      if (hostLocations) {
        this.logger.log(
          `HostLocation seed reversion completed successfully, ${rowCount} rows removed.`,
        );
      }
    } catch (error) {
      this.logger.error('HostLocation seed reversion failed', error.stack);
    }
  }
}
