import { Logger } from '@nestjs/common';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { Match } from '../match/match.entity';
import { GameSeed } from '../seed/game.seed';

export class GameSeed1571907084202 implements MigrationInterface {
  private logger = new Logger('GameSeed');

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting Game seed...');

    try {
      let count = 0;

      for (const game of GameSeed) {
        const match = await getRepository<Match>('Match').findOneOrFail(undefined, {
          where: { id: game.match },
        });
        const games = await getRepository('Game').save({
          ...game,
          match,
        });

        if (games) {
          count++;
        }
      }

      if (count > 0) {
        this.logger.log(`Game seed completed successfully, ${count} rows added.`);
      }
    } catch (error) {
      this.logger.error('Game seed failed', error.stack);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting Game seed reversion...');

    try {
      const games = await queryRunner.query('DELETE FROM "player_team"');
      const rowCount = games[1];

      if (games) {
        this.logger.log(`Game seed reversion completed successfully, ${rowCount} rows removed.`);
      }
    } catch (error) {
      this.logger.error('Game seed reversion failed', error.stack);
    }
  }
}
