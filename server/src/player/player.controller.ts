import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  public async create(@Body() player: Player) {
    console.log(player);
    await this.playerService.create(player);

    return 'new player account created';
  }

  @Get()
  public async findAll(): Promise<Player[]> {
    return await this.playerService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<Player | Error> {
    return await this.playerService.findOne(id);
  }

  @Post('login')
  public async login(@Body() player: Partial<Player>) {
    return await this.playerService.authenticate(player);
  }

  @Delete(':id')
  public async remove(@Param('id') id: number) {
    return await this.playerService.deletePlayer(id);
  }
}
