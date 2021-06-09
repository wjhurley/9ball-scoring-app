import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { AppConfigService } from '../config/app/config.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserNameAndEmail, UserRepository } from './user.repository';

import type { Merge } from 'ts-essentials';

export type UserInfo = Merge<UserNameAndEmail, { accessToken: string }>;

@Injectable()
export class AuthService {
  public constructor(
    private readonly configService: AppConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  private logger = new Logger('AuthService');

  public getCookieForSignOut(): string {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public async getCookieWithJwtToken(payload: JwtPayload): Promise<string> {
    const token = await this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.jwtExpires}`;
  }

  public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<UserInfo> {
    const user = await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email: user.email };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

    return {
      ...user,
      accessToken,
    };
  }

  public async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.signUp(createUserDto);
  }
}
