import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { SkillLevelRepository } from '../skill-level/skill-level.repository';
import { PlayerController } from './player.controller';
import { PlayerRepository } from './player.repository';
import { PlayerService } from './player.service';

@Module({
  controllers: [PlayerController],
  imports: [AuthModule, TypeOrmModule.forFeature([PlayerRepository, SkillLevelRepository])],
  providers: [PlayerService],
})
export class PlayerModule {}
