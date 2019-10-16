import { JwtModuleOptions } from '@nestjs/jwt';
import { DotenvParseOutput, parse } from 'dotenv';
import * as Fs from 'fs';
import { SignOptions } from 'jsonwebtoken';
import * as Path from 'path';

import config = require('config');

export function getJwtModuleOptions(): Partial<JwtModuleOptions> {
  const dotEnvFilePath = Path.resolve(__dirname, '../../.env');
  const jwtConfig: SignOptions = config.get('jwt');
  let dotEnv: Buffer | string = '';

  if (Fs.existsSync(dotEnvFilePath)) {
    dotEnv = Fs.readFileSync(dotEnvFilePath, { encoding: 'utf8' });
  }

  const envVariables: DotenvParseOutput = parse(dotEnv);

  if (!envVariables.hasOwnProperty('JWT_SECRET')) {
    throw new Error('Unable to get JWT secret from environment variable!');
  }

  const jwtModuleOptions: Partial<JwtModuleOptions> = {
    secret: envVariables.JWT_SECRET,
    signOptions: {
      expiresIn: jwtConfig.expiresIn,
    },
  };

  return jwtModuleOptions;
}
