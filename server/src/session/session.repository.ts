import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Session } from './session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { GetSessionsFilterDto } from './dto/get-sessions-filter.dto';

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {
  private logger = new Logger('SessionRepository');

  public async createSession(createSessionDto: CreateSessionDto): Promise<Session> {
    const { name, year } = createSessionDto;

    const session = new Session();
    session.name = name;
    session.year = year;

    try {
      await session.save();
    } catch (error) {
      this.logger.error(
        `Failed to create session. Data: ${JSON.stringify(createSessionDto)}`,
        error.stack,
      );

      throw new InternalServerErrorException();
    }

    return session;
  }

  public async getSessions(getSessionsDto: GetSessionsFilterDto): Promise<Session[]> {
    const { name, year } = getSessionsDto;
    const query = this.createQueryBuilder('session');

    if (name) {
      query.where('session.name = :name', { name });
    } else if (year) {
      query.where('session.year = :year', { year });
    }

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get session info. Arguments: ${JSON.stringify(getSessionsDto)}`,
        error.stack,
      );
      throw new NotFoundException();
    }
  }
}
