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
import { CreatePlayerTeamDto } from './dto/create-player-team.dto';
import { GetPlayerTeamsFilterDto } from './dto/get-player-teams-filter.dto';
import { UpdatePlayerTeamDto } from './dto/update-player-team.dto';
import { PlayerTeam } from './player-team.entity';
import { PlayerTeamService } from './player-team.service';

@Controller('api/player-team')
@UseGuards(AuthGuard())
export class PlayerTeamController {
  constructor(private playerTeamService: PlayerTeamService) {}

  private logger = new Logger('PlayerTeamController');

  @Post()
  @UsePipes(ValidationPipe)
  public createPlayerTeam(
    @Body() createPlayerTeamDto: CreatePlayerTeamDto,
    @GetUser() user: User,
  ): Promise<PlayerTeam> {
    this.logger.verbose(
      `User "${user.email}" creating a new player team. Data: ${JSON.stringify(
        createPlayerTeamDto,
      )}`,
    );
    return this.playerTeamService.createPlayerTeam(createPlayerTeamDto, user);
  }

  @Delete('/:id')
  public deletePlayerTeam(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.email}" deleting a player team. Player team: ${id}`);
    return this.playerTeamService.deletePlayerTeam(id);
  }

  @Get('/:id')
  public getPlayerTeamById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<PlayerTeam> {
    return this.playerTeamService.getPlayerTeamById(id);
  }

  @Get()
  public getPlayerTeams(
    @Query(ValidationPipe) filterDto: GetPlayerTeamsFilterDto,
    @GetUser() user: User,
  ): Promise<PlayerTeam[]> {
    this.logger.verbose(
      `User "${user.email}" retrieving all player teams. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.playerTeamService.getPlayerTeams(filterDto, user);
  }

  @Patch('/:id')
  public updatePlayerTeam(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerTeamDto: UpdatePlayerTeamDto,
    @GetUser() user: User,
  ): Promise<PlayerTeam> {
    return this.playerTeamService.updatePlayerTeam(id, updatePlayerTeamDto);
  }
}
