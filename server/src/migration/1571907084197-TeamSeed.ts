import { Logger } from '@nestjs/common';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { Division } from '../division/division.entity';
import { HostLocation } from '../host-location/host-location.entity';
import { TeamSeed } from '../seed/team.seed';

export class TeamSeed1571907084197 implements MigrationInterface {
  private logger = new Logger('TeamSeed');

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting Team seed...');

    try {
      let count = 0;

      for (const team of TeamSeed) {
        const division = await getRepository<Division>('Division').findOneOrFail(undefined, {
          where: { id: team.division },
        });
        const hostLocation = await getRepository<HostLocation>('HostLocation').findOneOrFail(
          undefined,
          {
            where: { id: team.hostLocation },
          },
        );
        const teams = await getRepository('Team').save({
          ...team,
          division,
          hostLocation,
        });

        if (teams) {
          count++;
        }
      }

      if (count > 0) {
        this.logger.log(`Team seed completed successfully, ${count} rows added.`);
      }
    } catch (error) {
      this.logger.error('Team seed failed', error.stack);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
