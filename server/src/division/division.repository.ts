import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { duplicateEntryErrorCode } from '../auth/user.repository';
import { Division } from './division.entity';
import { CreateDivisionDto } from './dto/create-division.dto';
import { GetDivisionsFilterDto } from './dto/get-divisions-filter.dto';

@EntityRepository(Division)
export class DivisionRepository extends Repository<Division> {
  private logger = new Logger('DivisionRepository');

  public async createDivision(createDivisionDto: CreateDivisionDto): Promise<Division> {
    const { dayOfWeek, format, name } = createDivisionDto;

    const division = new Division();
    division.dayOfWeek = dayOfWeek;
    division.format = format;
    division.name = name;

    try {
      await division.save();
    } catch (error) {
      this.logger.error(
        `Failed to create division. Data: ${JSON.stringify(createDivisionDto)}`,
        error.stack,
      );

      if (error.code === duplicateEntryErrorCode) {
        throw new ConflictException('Division name already exists for day of the week');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return division;
  }

  public async getDivision(division: Division): Promise<Division | undefined> {
    try {
      return await this.createQueryBuilder('division')
        .where('division.id = :id', { id: division })
        .getOne();
    } catch (error) {
      this.logger.error(
        `Failed to get division info. Arguments: ${JSON.stringify(division)}`,
        error.stack,
      );
      throw new NotFoundException();
    }
  }

  public async getDivisions(getDivisionsDto: GetDivisionsFilterDto): Promise<Division[]> {
    const { dayOfWeek, format } = getDivisionsDto;
    const query = this.createQueryBuilder('division');

    if (dayOfWeek) {
      query.where('division.dayOfWeek = :dayOfWeek', { dayOfWeek });
    } else if (format) {
      query.where('division.format = :format', { format });
    }

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get division info. Arguments: ${JSON.stringify(getDivisionsDto)}`,
        error.stack,
      );
      throw new NotFoundException();
    }
  }
}
