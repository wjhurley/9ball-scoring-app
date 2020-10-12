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
import { Division } from './division.entity';
import { DivisionService } from './division.service';
import { CreateDivisionDto } from './dto/create-division.dto';
import { GetDivisionsFilterDto } from './dto/get-divisions-filter.dto';
import { UpdateDivisionDto } from './dto/update-division.dto';

@Controller('api/division')
@UseGuards(AuthGuard())
export class DivisionController {
  constructor(private divisionService: DivisionService) {}

  private logger = new Logger('DivisionController');

  @Post()
  @UsePipes(ValidationPipe)
  public createDivision(
    @Body() createDivisionDto: CreateDivisionDto,
    @GetUser() user: User,
  ): Promise<Division> {
    this.logger.verbose(
      `User "${user.email}" creating a new division. Data: ${JSON.stringify(createDivisionDto)}`,
    );
    return this.divisionService.createDivision(createDivisionDto);
  }

  @Delete('/:id')
  public deleteDivision(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.email}" deleting a division. Division: ${id}`);
    return this.divisionService.deleteDivision(id);
  }

  @Get('/:id')
  public getDivisionById(@Param('id', ParseIntPipe) id: number): Promise<Division> {
    return this.divisionService.getDivisionById(id);
  }

  @Get()
  public getDivisions(
    @Query(ValidationPipe) filterDto: GetDivisionsFilterDto,
    @GetUser() user: User,
  ): Promise<Division[]> {
    this.logger.verbose(
      `User "${user.email}" retrieving all divisions. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.divisionService.getDivisions(filterDto);
  }

  @Patch('/:id')
  public updateDivision(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDivisionDto: UpdateDivisionDto,
    @GetUser() user: User,
  ): Promise<Division> {
    return this.divisionService.updateDivision(id, updateDivisionDto);
  }
}
