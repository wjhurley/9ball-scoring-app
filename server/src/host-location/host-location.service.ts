import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

import { HostLocation } from './host-location.entity';
import { HostLocationRepository } from './host-location.repository';
import { CreateHostLocationDto } from './dto/create-host-location.dto';
import { GetHostLocationsFilterDto } from './dto/get-host-locations-filter.dto';
import { UpdateHostLocationDto } from './dto/update-host-location.dto';

@Injectable()
export class HostLocationService {
  constructor(
    @InjectRepository(HostLocationRepository)
    private hostLocationRepository: HostLocationRepository,
  ) {}

  public async createHostLocation(
    createHostLocationDto: CreateHostLocationDto,
  ): Promise<HostLocation> {
    return this.hostLocationRepository.createHostLocation(createHostLocationDto);
  }

  public async deleteHostLocation(id: number): Promise<void> {
    const result = await this.hostLocationRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`HostLocation with ID "${id}" not found`);
    }
  }

  public async getHostLocationById(id: number): Promise<HostLocation> {
    const hostLocation = await this.hostLocationRepository.findOne({ where: { id } });

    if (_.isUndefined(hostLocation)) {
      throw new NotFoundException(`HostLocation with ID "${id}" not found`);
    }

    return hostLocation;
  }

  public async getHostLocations(filterDto: GetHostLocationsFilterDto): Promise<HostLocation[]> {
    return this.hostLocationRepository.getHostLocations(filterDto);
  }

  public async updateHostLocation(
    id: number,
    updateHostLocationDto: UpdateHostLocationDto,
  ): Promise<HostLocation> {
    const { address, city, name, phoneNumber, state, zipCode } = updateHostLocationDto;
    const hostLocation = await this.getHostLocationById(id);

    hostLocation.address = address || hostLocation.address;
    hostLocation.city = city || hostLocation.city;
    hostLocation.name = name || hostLocation.name;
    hostLocation.phoneNumber = phoneNumber || hostLocation.phoneNumber;
    hostLocation.state = state || hostLocation.state;
    hostLocation.zipCode = zipCode || hostLocation.zipCode;
    hostLocation.updatedAt = new Date(Date.now());

    await hostLocation.save();
    return hostLocation;
  }
}
