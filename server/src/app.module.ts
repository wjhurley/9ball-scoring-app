import { Module } from '@nestjs/common';

import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { PlayerController } from './controller/player.controller';
import { PlayerService } from './service/player.service';

@Module({
  imports: [],
  controllers: [AppController, PlayerController],
  providers: [AppService, PlayerService],
})
export class AppModule {}
