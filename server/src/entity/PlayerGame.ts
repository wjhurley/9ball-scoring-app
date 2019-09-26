import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Game } from './Game';
import { Player } from './Player';

@Entity('player_game')
export class PlayerGame {
  @Column({
    default: 0,
    name: 'points_scored',
    nullable: false,
    type: 'smallint',
  })
  public pointsScored: number;

  @Column({
    default: 0,
    name: 'player_score',
    nullable: false,
    type: 'smallint',
  })
  public playerScore: number;

  @Column({
    default: 0,
    nullable: false,
    type: 'smallint',
  })
  public defense: number;

  @Column({
    default: 0,
    nullable: false,
    type: 'smallint',
  })
  public timeout: number;

  @Column({
    default: 0,
    name: 'break_and_run',
    nullable: false,
    type: 'smallint',
  })
  public breakAndRun: number;

  @Column({
    default: 0,
    name: 'nine_on_snap',
    nullable: false,
    type: 'smallint',
  })
  public nineOnSnap: number;

  @Column({
    default: false,
    nullable: false,
    type: 'boolean',
  })
  public skunk: boolean;

  @Column({
    default: false,
    nullable: false,
    type: 'boolean',
  })
  public won: boolean;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
  })
  public createdAt: Date;

  @Column({
    default: null,
    name: 'updated_at',
    nullable: true,
    type: 'timestamptz',
  })
  public updatedAt: Date;

  @ManyToOne(type => Game, game => game.players, { primary: true })
  @JoinColumn({
    name: 'game_id',
  })
  public gameId: Game;

  @ManyToOne(type => Player, player => player.games, { primary: true })
  @JoinColumn({
    name: 'player_id',
  })
  public playerId: Player;
}
