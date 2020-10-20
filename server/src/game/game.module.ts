import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { GameController } from './game.controller';
import { GameRepository } from './game.repository';
import { GameService } from './game.service';

@Module({
  controllers: [GameController],
  imports: [AuthModule, TypeOrmModule.forFeature([GameRepository])],
  providers: [GameService],
})
export class GameModule {}
