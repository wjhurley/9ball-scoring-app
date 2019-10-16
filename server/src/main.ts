import { Logger } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import 'reflect-metadata';

import config = require('config');

import { AppModule } from './app.module';

export interface ServerConfiguration {
  origin?: string;
  port: number;
}

async function bootstrap(): Promise<void> {
  const serverConfig: ServerConfiguration = config.get('server');
  const port = process.env.PORT || serverConfig.port;
  const logger = new Logger('bootstrap');
  const app: NestApplication = await NestFactory.create(AppModule);

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap();
