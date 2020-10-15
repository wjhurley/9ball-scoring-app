import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

import { Session } from './session.entity';
import { SessionRepository } from './session.repository';
import { CreateSessionDto } from './dto/create-session.dto';
import { GetSessionsFilterDto } from './dto/get-sessions-filter.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionRepository)
    private sessionRepository: SessionRepository,
  ) {}

  public async createSession(createSessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionRepository.createSession(createSessionDto);
  }

  public async deleteSession(id: number): Promise<void> {
    const result = await this.sessionRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Session with ID "${id}" not found`);
    }
  }

  public async getSessionById(id: number): Promise<Session> {
    const session = await this.sessionRepository.findOne({ where: { id } });

    if (_.isUndefined(session)) {
      throw new NotFoundException(`Session with ID "${id}" not found`);
    }

    return session;
  }

  public async getSessions(filterDto: GetSessionsFilterDto): Promise<Session[]> {
    return this.sessionRepository.getSessions(filterDto);
  }

  public async updateSession(id: number, updateSessionDto: UpdateSessionDto): Promise<Session> {
    const { name, year } = updateSessionDto;
    const session = await this.getSessionById(id);

    session.name = name || session.name;
    session.year = year || session.year;
    session.updatedAt = new Date(Date.now());

    await session.save();
    return session;
  }
}
