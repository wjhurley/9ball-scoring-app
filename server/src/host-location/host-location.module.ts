import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { HostLocationController } from './host-location.controller';
import { HostLocationRepository } from './host-location.repository';
import { HostLocationService } from './host-location.service';

@Module({
  controllers: [HostLocationController],
  imports: [AuthModule, TypeOrmModule.forFeature([HostLocationRepository])],
  providers: [HostLocationService],
})
export class HostLocationModule {}
