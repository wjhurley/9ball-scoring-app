import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { PlayerController } from './player.controller';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Module({
  controllers: [PlayerController],
  imports: [AuthModule, TypeOrmModule.forFeature([Player])],
  providers: [PlayerService],
})
export class PlayerModule {}
