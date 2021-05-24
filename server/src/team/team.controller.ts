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

import { CookieAuthenticationGuard } from '../auth/cookie-authentication.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamsFilterDto } from './dto/get-teams-filter.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Controller('api/team')
@UseGuards(CookieAuthenticationGuard)
export class TeamController {
  constructor(private teamService: TeamService) {}

  private logger = new Logger('TeamController');

  @Post()
  @UsePipes(ValidationPipe)
  public createTeam(@Body() createTeamDto: CreateTeamDto, @GetUser() user: User): Promise<Team> {
    this.logger.verbose(
      `User "${user.email}" creating a new team. Data: ${JSON.stringify(createTeamDto)}`,
    );
    return this.teamService.createTeam(createTeamDto, user);
  }

  @Delete('/:id')
  public deleteTeam(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`User "${user.email}" deleting a team. Team: ${id}`);
    return this.teamService.deleteTeam(id);
  }

  @Get('/:id')
  public getTeamById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Team> {
    return this.teamService.getTeamById(id);
  }

  @Get()
  public getTeams(
    @Query(ValidationPipe) filterDto: GetTeamsFilterDto,
    @GetUser() user: User,
  ): Promise<Team[]> {
    this.logger.verbose(
      `User "${user.email}" retrieving all teams. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.teamService.getTeams(filterDto, user);
  }

  @Patch('/:id')
  public updateTeam(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
    @GetUser() user: User,
  ): Promise<Team> {
    return this.teamService.updateTeam(id, updateTeamDto);
  }
}
