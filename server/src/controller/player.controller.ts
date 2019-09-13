import * as Express from 'express';
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

import { Player } from '../entity/Player';
import { PlayerService } from '../service/player.service';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  public async create(
    @Body() player: Player,
    @Request() req: Express.Request,
    @Response() res: Express.Response,
  ) {
    console.log(player);
    await this.playerService.create(player);
  }

  @Get()
  public async findAll(
    @Request() req: Express.Request,
    @Response() res: Express.Response,
  ): Promise<Player[]> {
     return await this.playerService.findAll();
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
