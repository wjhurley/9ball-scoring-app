import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app/config.module';
import { AppConfigService } from './config/app/config.service';
import { OrmConfigService } from './config/orm-config.service';
import { DivisionModule } from './division/division.module';
import { GameModule } from './game/game.module';
import { HostLocationModule } from './host-location/host-location.module';
import { MatchModule } from './match/match.module';
import { PlayerModule } from './player/player.module';
import { PlayerTeamModule } from './player-team/player-team.module';
import { SessionModule } from './session/session.module';
import { TeamModule } from './team/team.module';

const configService = new ConfigService();
const appConfigService = new AppConfigService(configService);
const ormConfigService = new OrmConfigService(appConfigService);
const configSettings = ormConfigService.getConfig();

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    DivisionModule,
    GameModule,
    HostLocationModule,
    MatchModule,
    PlayerModule,
    PlayerTeamModule,
    SessionModule,
    TeamModule,
    TypeOrmModule.forRoot(configSettings),
  ],
})
export class AppModule {}
