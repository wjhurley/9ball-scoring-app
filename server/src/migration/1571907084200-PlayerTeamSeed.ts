import { Logger } from '@nestjs/common';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { Player } from '../player/player.entity';
import { Team } from '../team/team.entity';
import { PlayerTeamSeed } from '../seed/player-team.seed';

export class PlayerTeamSeed1571907084200 implements MigrationInterface {
  private logger = new Logger('PlayerTeamSeed');

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting PlayerTeam seed...');

    try {
      let count = 0;

      for (const playerTeam of PlayerTeamSeed) {
        const player = await getRepository<Player>('Player').findOneOrFail(undefined, {
          where: { id: playerTeam.player },
        });
        const team = await getRepository<Team>('Team').findOneOrFail(undefined, {
          where: { id: playerTeam.team },
        });
        const playerTeams = await getRepository('PlayerTeam').save({
          ...playerTeam,
          player,
          team,
        });

        if (playerTeams) {
          count++;
        }
      }

      if (count > 0) {
        this.logger.log(`PlayerTeam seed completed successfully, ${count} rows added.`);
      }
    } catch (error) {
      this.logger.error('PlayerTeam seed failed', error.stack);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting PlayerTeam seed reversion...');

    try {
      const playerTeams = await queryRunner.query('DELETE FROM "player_team"');
      const rowCount = playerTeams[1];

      if (playerTeams) {
        this.logger.log(
          `PlayerTeam seed reversion completed successfully, ${rowCount} rows removed.`,
        );
      }
    } catch (error) {
      this.logger.error('PlayerTeam seed reversion failed', error.stack);
    }
  }
}
