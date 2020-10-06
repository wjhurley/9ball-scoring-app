import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';

import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';

async function bootstrap(): Promise<void> {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get('AppConfigService');

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors();
    // TODO: Un-comment the lines below once deployed to live server
    // app.enableCors({ origin: appConfig.serverOrigin });
    // logger.log(`Accepting requests from origin "${appConfig.serverOrigin}"`);
  }

  await app.listen(appConfig.serverPort);
  logger.log(`Application listening on port ${appConfig.serverPort}`);
}

bootstrap();
