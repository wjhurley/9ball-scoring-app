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
import { Game } from './game.entity';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGamesFilterDto } from './dto/get-games-filter.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('api/game')
@UseGuards(AuthGuard())
export class GameController {
  constructor(private gameService: GameService) {}

  private logger = new Logger('GameController');

  @Post()
  @UsePipes(ValidationPipe)
  public createGame(@Body() createGameDto: CreateGameDto, @GetUser() user: User): Promise<Game> {
    this.logger.verbose(
      `User "${user.email}" creating a new game. Data: ${JSON.stringify(createGameDto)}`,
    );
    return this.gameService.createGame(createGameDto);
  }

  @Delete('/:id')
  public deleteGame(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`User "${user.email}" deleting a game. Game: ${id}`);
    return this.gameService.deleteGame(id);
  }

  @Get('/:id')
  public getGameById(@Param('id', ParseIntPipe) id: number): Promise<Game> {
    return this.gameService.getGameById(id);
  }

  @Get()
  public getGames(
    @Query(ValidationPipe) filterDto: GetGamesFilterDto,
    @GetUser() user: User,
  ): Promise<Game[]> {
    this.logger.verbose(
      `User "${user.email}" retrieving all games. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.gameService.getGames(filterDto);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  public updateGame(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGameDto: UpdateGameDto,
    @GetUser() user: User,
  ): Promise<Game> {
    return this.gameService.updateGame(id, updateGameDto);
  }
}
