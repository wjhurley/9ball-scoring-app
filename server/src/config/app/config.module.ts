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
        DB_DATABASE: Joi.string().default('break_n_score'),
        DB_HOST: Joi.string().default('localhost'),
        DB_PASS: Joi.string().default('sample_password'),
        DB_PORT: Joi.number().default(5432),
        DB_SYNCHRONIZE: Joi.boolean().default(true),
        DB_TYPE: Joi.string().default('postgres'),
        DB_USER: Joi.string().default('sample_user'),
        JWT_EXPIRES: Joi.number().default(3600),
        JWT_SECRET: Joi.string().default('some_secret'),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'provision', 'test')
          .default('development'),
        SERVER_ORIGIN: Joi.string(),
        SERVER_PORT: Joi.number().default(5000),
      }),
    }),
  ],
  providers: [AppConfigService, ConfigService],
})
export class AppConfigModule {}
