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
import { CreatePlayerDto } from './dto/create-player.dto';
import { GetPlayersFilterDto } from './dto/get-players-filter.dto';
import { UpdatePlayerSkillLevelDto } from './dto/update-player-skill-level.dto';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Controller('api/player')
@UseGuards(AuthGuard())
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  private logger = new Logger('PlayerController');

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

  @Delete('/:id')
  public deletePlayer(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`User "${user.email}" deleting a player. Player: ${id}`);
    return this.playerService.deletePlayer(id, user);
  }

  @Get('/:id')
  public getPlayerById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Player> {
    return this.playerService.getPlayerById(id, user);
  }

  @Get()
  public getPlayers(
    @Query(ValidationPipe) filterDto: GetPlayersFilterDto,
    @GetUser() user: User,
  ): Promise<Player[]> {
    this.logger.verbose(
      `User "${user.email}" retrieving all players. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.playerService.getPlayers(filterDto, user);
  }

  @Patch('/:id/skill-level')
  public updatePlayerSkillLevel(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerSkillLevelDto: UpdatePlayerSkillLevelDto,
    @GetUser() user: User,
  ): Promise<Player> {
    return this.playerService.updatePlayerSkillLevel(id, updatePlayerSkillLevelDto, user);
  }
}
