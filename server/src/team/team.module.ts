import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { DivisionRepository } from '../division/division.repository';
import { HostLocationRepository } from '../host-location/host-location.repository';
import { TeamController } from './team.controller';
import { TeamRepository } from './team.repository';
import { TeamService } from './team.service';

@Module({
  controllers: [TeamController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([DivisionRepository, HostLocationRepository, TeamRepository]),
  ],
  providers: [TeamService],
})
export class TeamModule {}
