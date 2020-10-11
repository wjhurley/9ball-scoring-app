import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { DivisionController } from './division.controller';
import { DivisionRepository } from './division.repository';
import { DivisionService } from './division.service';

@Module({
  controllers: [DivisionController],
  imports: [AuthModule, TypeOrmModule.forFeature([DivisionRepository])],
  providers: [DivisionService],
})
export class DivisionModule {}
