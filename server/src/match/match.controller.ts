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
import { Match } from './match.entity';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { GetMatchesFilterDto } from './dto/get-matches-filter.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Controller('api/match')
@UseGuards(AuthGuard())
export class MatchController {
  constructor(private matchService: MatchService) {}

  private logger = new Logger('MatchController');

  @Post()
  @UsePipes(ValidationPipe)
  public createMatch(
    @Body() createMatchDto: CreateMatchDto,
    @GetUser() user: User,
  ): Promise<Match> {
    this.logger.verbose(
      `User "${user.email}" creating a new match. Data: ${JSON.stringify(createMatchDto)}`,
    );
    return this.matchService.createMatch(createMatchDto);
  }

  @Delete('/:id')
  public deleteMatch(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`User "${user.email}" deleting a match. Match: ${id}`);
    return this.matchService.deleteMatch(id);
  }

  @Get('/:id')
  public getMatchById(@Param('id', ParseIntPipe) id: number): Promise<Match> {
    return this.matchService.getMatchById(id);
  }

  @Get()
  public getMatches(
    @Query(ValidationPipe) filterDto: GetMatchesFilterDto,
    @GetUser() user: User,
  ): Promise<Match[]> {
    this.logger.verbose(
      `User "${user.email}" retrieving all matches. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.matchService.getMatches(filterDto);
  }

  @Patch('/:id')
  public updateMatch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMatchDto: UpdateMatchDto,
    @GetUser() user: User,
  ): Promise<Match> {
    return this.matchService.updateMatch(id, updateMatchDto);
  }
}
