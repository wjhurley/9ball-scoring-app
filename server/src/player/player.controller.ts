import {
  Body,
  Controller,
  Logger,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Controller('api/player')
@UseGuards(AuthGuard())
export class PlayerController {
  private logger = new Logger('PlayerController');

  constructor(private playerService: PlayerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  public createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
    @GetUser() user: User,
  ): Promise<Player> {
    this.logger.verbose(
      `User "${user.email}" creating a new player. Data: ${JSON.stringify(createPlayerDto)}`,
    );
    return this.playerService.createPlayer(createPlayerDto, user);
  }
}
