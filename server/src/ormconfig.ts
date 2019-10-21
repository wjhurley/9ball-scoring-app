import { DotenvParseOutput, parse } from 'dotenv';
import * as Fs from 'fs';
import * as Path from 'path';
import { BaseConnectionOptions } from 'typeorm/connection/BaseConnectionOptions';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

interface EnvObject {
  POSTGRES_PASS: string;
  POSTGRES_USER: string;
}

export interface OrmConfiguration extends BaseConnectionOptions {
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

export class OrmConfig {
  constructor() {
    this.configuration = OrmConfig.setConfig();
  }

  private readonly configuration: OrmConfiguration;

  private static getDesiredEnvVars(envArgs: DotenvParseOutput): EnvObject {
    const defaultEnvVars: EnvObject = {
      POSTGRES_PASS: '',
      POSTGRES_USER: '',
    };

    for (const key in defaultEnvVars) {
      if (envArgs.hasOwnProperty(key)) {
        defaultEnvVars[key as keyof EnvObject] = envArgs[key];
      }
    }

    return defaultEnvVars;
  }

  public static setConfig(): OrmConfiguration {
    const dotEnvFilePath = Path.resolve(__dirname, '../../.env');
    let dotEnv: Buffer | string = '';

    if (Fs.existsSync(dotEnvFilePath)) {
      dotEnv = Fs.readFileSync(dotEnvFilePath, { encoding: 'utf8' });
    }

    const envVariables: DotenvParseOutput = parse(dotEnv);
    const dbVariables: EnvObject = OrmConfig.getDesiredEnvVars(envVariables);

    return {
      database: 'break_n_score',
      entities: [__dirname + '/../**/*.entity.js'],
      host: 'localhost',
      logging: ['error'],
      migrations: [__dirname + '/../**/*.migration.js'],
      password: dbVariables.POSTGRES_PASS,
      port: 5432,
      subscribers: [__dirname + '/../**/*.subscriber.js'],
      synchronize: true,
      type: 'postgres',
      username: dbVariables.POSTGRES_USER,
    };
  }

  public getConfig(): OrmConfiguration {
    if (this.configuration) {
      return this.configuration;
    }

    return OrmConfig.setConfig();
  }
}
