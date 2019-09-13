import { createConnection } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';

import { AppModule } from './app.module';
import { OrmConfig } from './ormconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);

  const configuration = new OrmConfig;
  const configSettings = configuration.getConfig();

  await createConnection(configSettings)
    .then(connection => {
      // TODO: determine if anything needs to be done with the db at this point
      console.log('connected to break_n_score');
    })
    .catch(error => {
      console.log(error);
    });
}

bootstrap();
