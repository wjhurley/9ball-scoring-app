import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

import { Division } from './division.entity';
import { DivisionRepository } from './division.repository';
import { CreateDivisionDto } from './dto/create-division.dto';
import { GetDivisionsFilterDto } from './dto/get-divisions-filter.dto';
import { UpdateDivisionDto } from './dto/update-division.dto';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(DivisionRepository)
    private divisionRepository: DivisionRepository,
  ) {}

  public async createDivision(createDivisionDto: CreateDivisionDto): Promise<Division> {
    return this.divisionRepository.createDivision(createDivisionDto);
  }

  public async deleteDivision(id: number): Promise<void> {
    const result = await this.divisionRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Division with ID "${id}" not found`);
    }
  }

  public async getDivisionById(id: number): Promise<Division> {
    const division = await this.divisionRepository.findOne({ where: { id } });

    if (_.isUndefined(division)) {
      throw new NotFoundException(`Division with ID "${id}" not found`);
    }

    return division;
  }

  public async getDivisions(filterDto: GetDivisionsFilterDto): Promise<Division[]> {
    return this.divisionRepository.getDivisions(filterDto);
  }

  public async updateDivision(id: number, updateDivisionDto: UpdateDivisionDto): Promise<Division> {
    const { dayOfWeek, format, name } = updateDivisionDto;
    const division = await this.getDivisionById(id);

    division.dayOfWeek = dayOfWeek || division.dayOfWeek;
    division.format = format || division.format;
    division.name = name || division.name;
    division.updatedAt = new Date(Date.now());

    await division.save();
    return division;
  }
}
