import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app/config.module';
import { AppConfigService } from './config/app/config.service';
import { OrmConfigService } from './config/orm-config.service';
import { DivisionModule } from './division/division.module';
import { PlayerModule } from './player/player.module';

const configService = new ConfigService();
const appConfigService = new AppConfigService(configService);
const ormConfigService = new OrmConfigService(appConfigService);
const configSettings = ormConfigService.getConfig();

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    DivisionModule,
    PlayerModule,
    TypeOrmModule.forRoot(configSettings),
  ],
})
export class AppModule {}
