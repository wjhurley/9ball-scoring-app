import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from '../config/app/config.module';
import { AppConfigService } from '../config/app/config.service';
import { JwtConfigService } from '../config/jwt-config.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CookieStrategy } from './cookie.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

const configService = new ConfigService();
const appConfigService = new AppConfigService(configService);
const jwtConfigService = new JwtConfigService(appConfigService);
const jwtConfig = jwtConfigService.getJwtModuleOptions();

@Module({
  controllers: [AuthController],
  exports: [CookieStrategy, JwtStrategy, PassportModule],
  imports: [
    AppConfigModule,
    JwtModule.register(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [AuthService, CookieStrategy, JwtStrategy],
})
export class AuthModule {}
