import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { PlayerRepository } from '../player/player.repository';
import { TeamRepository } from '../team/team.repository';
import { PlayerTeamController } from './player-team.controller';
import { PlayerTeamRepository } from './player-team.repository';
import { PlayerTeamService } from './player-team.service';

@Module({
  controllers: [PlayerTeamController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([PlayerRepository, PlayerTeamRepository, TeamRepository]),
  ],
  providers: [PlayerTeamService],
})
export class PlayerTeamModule {}
