import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { SessionController } from './session.controller';
import { SessionRepository } from './session.repository';
import { SessionService } from './session.service';

@Module({
  controllers: [SessionController],
  imports: [AuthModule, TypeOrmModule.forFeature([SessionRepository])],
  providers: [SessionService],
})
export class SessionModule {}
