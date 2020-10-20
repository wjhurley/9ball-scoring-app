import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { MatchController } from './match.controller';
import { MatchRepository } from './match.repository';
import { MatchService } from './match.service';

@Module({
  controllers: [MatchController],
  imports: [AuthModule, TypeOrmModule.forFeature([MatchRepository])],
  providers: [MatchService],
})
export class MatchModule {}
