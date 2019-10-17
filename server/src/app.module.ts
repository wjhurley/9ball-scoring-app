import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { OrmConfig } from './ormconfig';
import { PlayerModule } from './player/player.module';

const configuration = new OrmConfig();
const configSettings = configuration.getConfig();

@Module({
  imports: [AuthModule, PlayerModule, TypeOrmModule.forRoot(configSettings)],
})
export class AppModule {}
