import { Injectable } from '@nestjs/common';
import { BaseConnectionOptions } from 'typeorm/connection/BaseConnectionOptions';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

import { AppConfigService } from './app/config.service';

export interface OrmConfiguration extends BaseConnectionOptions {
  cli: {
    migrationsDir: string;
  };
  database: string;
  entities: string[];
  host: string;
  logging: LoggerOptions;
  migrations: string[];
  password: string;
  port: number;
  subscribers: string[];
  synchronize: boolean;
  type: 'postgres';
  username: string;
}

@Injectable()
export class OrmConfigService {
  public constructor(private appConfigService: AppConfigService) {
    this.configuration = this.setConfig();
  }

  private readonly configuration: OrmConfiguration;

  public setConfig(): OrmConfiguration {
    const {
      dbDatabase,
      dbHost,
      dbPass,
      dbPort,
      dbSynchronize,
      dbType,
      dbUser,
      nodeEnv,
    } = this.appConfigService;
    const folder = nodeEnv !== 'development' ? 'src' : 'dist';
    const fileExt = nodeEnv !== 'development' ? 'ts' : 'js';

    if (dbPass === undefined || dbUser === undefined) {
      throw new Error('Unable to get Postgres values from environment variables!');
    }

    return {
      cli: {
        migrationsDir: 'src/migration',
      },
      database: dbDatabase,
      entities: [`${folder}/**/*.entity.${fileExt}`],
      host: dbHost,
      logging: ['error'],
      migrations: [`${folder}/migration/**/*.${fileExt}`],
      password: dbPass,
      port: dbPort,
      subscribers: [`${folder}/subscriber/**/*.${fileExt}`],
      synchronize: dbSynchronize,
      type: dbType as OrmConfiguration['type'],
      username: dbUser,
    };
  }

  public getConfig(): OrmConfiguration {
    if (this.configuration) {
      return this.configuration;
    }

    return this.setConfig();
  }
}
