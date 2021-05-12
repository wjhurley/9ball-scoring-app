import { Logger } from '@nestjs/common';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { Game } from '../game/game.entity';
import { Player } from '../player/player.entity';
import { PlayerGameSeed } from '../seed/player-game.seed';

export class PlayerGameSeed1571907084204 implements MigrationInterface {
  private logger = new Logger('PlayerGameSeed');

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting PlayerGame seed...');

    try {
      let count = 0;

      for (const playerGame of PlayerGameSeed) {
        const player = await getRepository<Player>('Player').findOneOrFail(undefined, {
          where: { id: playerGame.player },
        });
        const game = await getRepository<Game>('Game').findOneOrFail(undefined, {
          where: { id: playerGame.game },
        });
        const playerGames = await getRepository('PlayerGame').save({
          ...playerGame,
          player,
          game,
        });

        if (playerGames) {
          count++;
        }
      }

      if (count > 0) {
        this.logger.log(`PlayerGame seed completed successfully, ${count} rows added.`);
      }
    } catch (error) {
      this.logger.error('PlayerGame seed failed', error.stack);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting PlayerGame seed reversion...');

    try {
      const playerGames = await queryRunner.query('DELETE FROM "player_game"');
      const rowCount = playerGames[1];

      if (playerGames) {
        this.logger.log(
          `PlayerGame seed reversion completed successfully, ${rowCount} rows removed.`,
        );
      }
    } catch (error) {
      this.logger.error('PlayerGame seed reversion failed', error.stack);
    }
  }
}
