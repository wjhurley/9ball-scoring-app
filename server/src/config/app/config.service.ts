import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get dbDatabase(): string {
    return this.configService.get<string>('DB_DATABASE', 'break_n_score');
  }

  get dbHost(): string {
    return this.configService.get<string>('DB_HOST', 'localhost');
  }

  get dbPass(): string | undefined {
    return this.configService.get<string>('DB_PASS');
  }

  get dbPort(): number {
    return Number(this.configService.get<number>('DB_PORT', 5432));
  }

  get dbSynchronize(): boolean {
    return this.configService.get<string>('DB_SYNCHRONIZE', 'true') === 'true';
  }

  get dbType(): string {
    return this.configService.get<string>('DB_TYPE', 'postgres');
  }

  get dbUser(): string | undefined {
    return this.configService.get<string>('DB_USER');
  }

  get jwtExpires(): number {
    return Number(this.configService.get<number>('JWT_EXPIRES', 3600));
  }

  get jwtSecret(): string | undefined {
    return this.configService.get<string>('JWT_SECRET');
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', 'development');
  }

  get serverOrigin(): string | undefined {
    return this.configService.get<string>('SERVER_ORIGIN');
  }

  get serverPort(): number {
    return Number(this.configService.get<number>('SERVER_PORT', 5000));
  }
}
