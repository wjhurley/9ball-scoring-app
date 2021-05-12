import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreatePlayerGameDto } from './dto/create-player-game.dto';
import { GetPlayerGamesFilterDto } from './dto/get-player-games-filter.dto';
import { UpdatePlayerGameDto } from './dto/update-player-game.dto';
import { PlayerGame } from './player-game.entity';
import { PlayerGameService } from './player-game.service';

@Controller('api/player-game')
@UseGuards(AuthGuard())
export class PlayerGameController {
  constructor(private playerGameService: PlayerGameService) {}

  private logger = new Logger('PlayerGameController');

  @Post()
  @UsePipes(ValidationPipe)
  public createPlayerGame(
    @Body() createPlayerGameDto: CreatePlayerGameDto,
    @GetUser() user: User,
  ): Promise<PlayerGame> {
    this.logger.verbose(
      `User "${user.email}" creating a new player game. Data: ${JSON.stringify(
        createPlayerGameDto,
      )}`,
    );
    return this.playerGameService.createPlayerGame(createPlayerGameDto, user);
  }

  @Delete('/:id')
  public deletePlayerGame(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.email}" deleting a player game. Player game: ${id}`);
    return this.playerGameService.deletePlayerGame(id);
  }

  @Get('/:id')
  public getPlayerGameById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<PlayerGame> {
    return this.playerGameService.getPlayerGameById(id);
  }

  @Get()
  public getPlayerGames(
    @Query(ValidationPipe) filterDto: GetPlayerGamesFilterDto,
    @GetUser() user: User,
  ): Promise<PlayerGame[]> {
    this.logger.verbose(
      `User "${user.email}" retrieving all player games. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.playerGameService.getPlayerGames(filterDto, user);
  }

  @Patch('/:id')
  public updatePlayerGame(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerGameDto: UpdatePlayerGameDto,
    @GetUser() user: User,
  ): Promise<PlayerGame> {
    return this.playerGameService.updatePlayerGame(id, updatePlayerGameDto);
  }
}
