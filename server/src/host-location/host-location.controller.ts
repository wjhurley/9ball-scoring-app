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
import { CreateHostLocationDto } from './dto/create-host-location.dto';
import { GetHostLocationsFilterDto } from './dto/get-host-locations-filter.dto';
import { UpdateHostLocationDto } from './dto/update-host-location.dto';
import { HostLocation } from './host-location.entity';
import { HostLocationService } from './host-location.service';

@Controller('api/host-location')
@UseGuards(AuthGuard())
export class HostLocationController {
  constructor(private hostLocationService: HostLocationService) {}

  private logger = new Logger('HostLocationController');

  @Post()
  @UsePipes(ValidationPipe)
  public createHostLocation(
    @Body() createHostLocationDto: CreateHostLocationDto,
    @GetUser() user: User,
  ): Promise<HostLocation> {
    this.logger.verbose(
      `User "${user.email}" creating a new host location. Data: ${JSON.stringify(
        createHostLocationDto,
      )}`,
    );
    return this.hostLocationService.createHostLocation(createHostLocationDto);
  }

  @Delete('/:id')
  public deleteHostLocation(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.email}" deleting a host location. HostLocation: ${id}`);
    return this.hostLocationService.deleteHostLocation(id);
  }

  @Get('/:id')
  public getHostLocationById(@Param('id', ParseIntPipe) id: number): Promise<HostLocation> {
    return this.hostLocationService.getHostLocationById(id);
  }

  @Get()
  public getHostLocations(
    @Query(ValidationPipe) filterDto: GetHostLocationsFilterDto,
    @GetUser() user: User,
  ): Promise<HostLocation[]> {
    this.logger.verbose(
      `User "${user.email}" retrieving all host locations. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.hostLocationService.getHostLocations(filterDto);
  }

  @Patch('/:id')
  public updateHostLocation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHostLocationDto: UpdateHostLocationDto,
    @GetUser() user: User,
  ): Promise<HostLocation> {
    return this.hostLocationService.updateHostLocation(id, updateHostLocationDto);
  }
}
