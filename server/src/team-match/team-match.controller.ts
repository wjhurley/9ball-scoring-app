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
import { CreateTeamMatchDto } from './dto/create-team-match.dto';
import { GetTeamMatchesFilterDto } from './dto/get-team-matches-filter.dto';
import { UpdateTeamMatchDto } from './dto/update-team-match.dto';
import { TeamMatch } from './team-match.entity';
import { TeamMatchService } from './team-match.service';

@Controller('api/team-match')
@UseGuards(AuthGuard())
export class TeamMatchController {
  constructor(private teamMatchService: TeamMatchService) {}

  private logger = new Logger('TeamMatchController');

  @Post()
  @UsePipes(ValidationPipe)
  public createTeamMatch(
    @Body() createTeamMatchDto: CreateTeamMatchDto,
    @GetUser() user: User,
  ): Promise<TeamMatch> {
    this.logger.verbose(
      `User "${user.email}" creating a new team match. Data: ${JSON.stringify(createTeamMatchDto)}`,
    );
    return this.teamMatchService.createTeamMatch(createTeamMatchDto, user);
  }

  @Delete('/:id')
  public deleteTeamMatch(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.email}" deleting a team match. Team match: ${id}`);
    return this.teamMatchService.deleteTeamMatch(id);
  }

  @Get('/:id')
  public getTeamMatchById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<TeamMatch> {
    return this.teamMatchService.getTeamMatchById(id);
  }

  @Get()
  public getTeamMatches(
    @Query(ValidationPipe) filterDto: GetTeamMatchesFilterDto,
    @GetUser() user: User,
  ): Promise<TeamMatch[]> {
    this.logger.verbose(
      `User "${user.email}" retrieving all team matches. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.teamMatchService.getTeamMatches(filterDto, user);
  }

  @Patch('/:id')
  public updateTeamMatch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamMatchDto: UpdateTeamMatchDto,
    @GetUser() user: User,
  ): Promise<TeamMatch> {
    return this.teamMatchService.updateTeamMatch(id, updateTeamMatchDto);
  }
}
