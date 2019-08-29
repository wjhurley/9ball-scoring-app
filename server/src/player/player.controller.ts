import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import * as Express from 'express';

import { CreatePlayerDto } from './player.dto';

@Controller('api/player')
export class PlayerController {
  @Post()
  public create(
    @Body() body: CreatePlayerDto,
    @Request() req: Express.Request,
    @Response() res: Express.Response,
  ) {
    console.log(body);
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  public findAll(
    @Request() req: Express.Request,
    @Response() res: Express.Response,
  ) {
     res.status(HttpStatus.OK).json([]);
  }

  @Get(':id')
  public findOne(
    @Param('id') id: string,
    @Request() req: Express.Request,
    @Response() res: Express.Response,
  ) {
    res.status(HttpStatus.OK).json([]);
  }

  @Delete(':id')
  public remove(
    @Param('id') id: string,
    @Request() req: Express.Request,
    @Response() res: Express.Response,
  ) {
    res.status(HttpStatus.OK).json([]);
  }
}

export default PlayerController;
