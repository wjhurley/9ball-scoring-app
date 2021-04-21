import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { UserSeed } from '../seed/user.seed';

export class UserSeed1571907084198 implements MigrationInterface {
  private logger = new Logger('UserSeed');

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting User seed...');

    try {
      let count = 0;

      for (const user of UserSeed) {
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(user.password ?? '', user.salt);

        const users = await getRepository('User').save(user);

        if (users) {
          count++;
        }
      }

      if (count > 0) {
        this.logger.log(`User seed completed successfully, ${count} rows added.`);
      }
    } catch (error) {
      this.logger.error('User seed failed', error.stack);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting User seed reversion...');

    try {
      const users = await queryRunner.query(`DELETE FROM "user"`);
      const rowCount = users[1];

      if (users) {
        this.logger.log(`User seed reversion completed successfully, ${rowCount} rows removed.`);
      }
    } catch (error) {
      this.logger.error('User seed reversion failed', error.stack);
    }
  }
}
