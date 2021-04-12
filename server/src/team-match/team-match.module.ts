import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { MatchRepository } from '../match/match.repository';
import { TeamRepository } from '../team/team.repository';
import { TeamMatchController } from './team-match.controller';
import { TeamMatchRepository } from './team-match.repository';
import { TeamMatchService } from './team-match.service';

@Module({
  controllers: [TeamMatchController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([MatchRepository, TeamMatchRepository, TeamRepository]),
  ],
  providers: [TeamMatchService],
})
export class TeamMatchModule {}
