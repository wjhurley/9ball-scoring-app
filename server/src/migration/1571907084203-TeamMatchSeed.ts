import { Logger } from '@nestjs/common';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { Match } from '../match/match.entity';
import { TeamMatchSeed } from '../seed/team-match.seed';
import { Team } from '../team/team.entity';

export class TeamMatchSeed1571907084203 implements MigrationInterface {
  private logger = new Logger('TeamMatchSeed');

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting TeamMatch seed...');

    try {
      let count = 0;

      for (const teamMatch of TeamMatchSeed) {
        const team = await getRepository<Team>('Team').findOneOrFail(undefined, {
          where: { id: teamMatch.team },
        });
        const match = await getRepository<Match>('Match').findOneOrFail(undefined, {
          where: { id: teamMatch.match },
        });
        const teamMatches = await getRepository('TeamMatch').save({
          ...teamMatch,
          team,
          match,
        });

        if (teamMatches) {
          count++;
        }
      }

      if (count > 0) {
        this.logger.log(`TeamMatch seed completed successfully, ${count} rows added.`);
      }
    } catch (error) {
      this.logger.error('TeamMatch seed failed', error.stack);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting TeamMatch seed reversion...');

    try {
      const teamMatches = await queryRunner.query('DELETE FROM "team_match"');
      const rowCount = teamMatches[1];

      if (teamMatches) {
        this.logger.log(
          `TeamMatch seed reversion completed successfully, ${rowCount} rows removed.`,
        );
      }
    } catch (error) {
      this.logger.error('TeamMatch seed reversion failed', error.stack);
    }
  }
}
