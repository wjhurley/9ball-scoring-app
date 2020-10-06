import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppConfigService } from './config.service';
import configuration from './configuration';

@Module({
  exports: [AppConfigService, ConfigService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().default('some_secret'),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'provision', 'test')
          .default('development'),
        POSTGRES_PASS: Joi.string().default('sample_password'),
        POSTGRES_USER: Joi.string().default('sample_user'),
      }),
    }),
  ],
  providers: [AppConfigService, ConfigService],
})
export class AppConfigModule {}
