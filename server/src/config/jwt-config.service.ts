import { Injectable } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';

import { AppConfigService } from './app/config.service';

@Injectable()
export class JwtConfigService {
  public constructor(private appConfigService: AppConfigService) {}

  public getJwtModuleOptions(): Partial<JwtModuleOptions> {
    if (this.appConfigService.jwtSecret === undefined) {
      throw new Error('Unable to get JWT secret from environment variable!');
    }

    return {
      secret: this.appConfigService.jwtSecret,
      signOptions: {
        expiresIn: this.appConfigService.jwtExpires,
      },
    };
  }
}
