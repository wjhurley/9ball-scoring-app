import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CookieAuthenticationGuard extends AuthGuard('cookie') {}
