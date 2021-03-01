import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { duplicateEntryErrorCode } from '../auth/user.repository';
import { CreateHostLocationDto } from './dto/create-host-location.dto';
import { GetHostLocationsFilterDto } from './dto/get-host-locations-filter.dto';
import { HostLocation } from './host-location.entity';

@EntityRepository(HostLocation)
export class HostLocationRepository extends Repository<HostLocation> {
  private logger = new Logger('HostLocationRepository');

  public async createHostLocation(
    createHostLocationDto: CreateHostLocationDto,
  ): Promise<HostLocation> {
    const { address, city, name, phoneNumber, state, zipCode } = createHostLocationDto;

    const hostLocation = new HostLocation();
    hostLocation.address = address;
    hostLocation.city = city;
    hostLocation.name = name;
    hostLocation.phoneNumber = phoneNumber;
    hostLocation.state = state;
    hostLocation.zipCode = zipCode;

    try {
      await hostLocation.save();
    } catch (error) {
      this.logger.error(
        `Failed to create host location. Data: ${JSON.stringify(createHostLocationDto)}`,
        error.stack,
      );

      if (error.code === duplicateEntryErrorCode) {
        throw new ConflictException('Host Location already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return hostLocation;
  }

  public async getHostLocation(hostLocation: HostLocation): Promise<HostLocation | undefined> {
    try {
      return this.createQueryBuilder('host_location')
        .where('host_location.id = :id', { id: hostLocation })
        .getOne();
    } catch (error) {
      this.logger.error(
        `Failed to get host location info. Arguments: ${JSON.stringify(hostLocation)}`,
        error.stack,
      );
      throw new NotFoundException();
    }
  }

  public async getHostLocations(
    getHostLocationsFilterDto: GetHostLocationsFilterDto,
  ): Promise<HostLocation[]> {
    const { address, name, phoneNumber } = getHostLocationsFilterDto;
    const query = this.createQueryBuilder('host_location');

    if (phoneNumber) {
      query.where('host_location.phoneNumber = :phoneNumber', { phoneNumber });
    } else if (name) {
      query.where('host_location.name = :name', { name });
    } else if (address) {
      query.where('host_location.address = :address', { address });
    }

    try {
      return query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get host location info. Arguments: ${JSON.stringify(getHostLocationsFilterDto)}`,
        error.stack,
      );
      throw new NotFoundException();
    }
  }
}
