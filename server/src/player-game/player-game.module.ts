import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { GameRepository } from '../game/game.repository';
import { PlayerRepository } from '../player/player.repository';
import { PlayerGameController } from './player-game.controller';
import { PlayerGameRepository } from './player-game.repository';
import { PlayerGameService } from './player-game.service';

@Module({
  controllers: [PlayerGameController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([GameRepository, PlayerGameRepository, PlayerRepository]),
  ],
  providers: [PlayerGameService],
})
export class PlayerGameModule {}
