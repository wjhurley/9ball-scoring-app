import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Match } from './match.entity';
import { PlayerGame } from './player-game.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public id: number;

  @Column({
    name: 'start_time',
    nullable: false,
    type: 'time',
  })
  public startTime: Date;

  @Column({
    default: null,
    name: 'end_time',
    nullable: true,
    type: 'time',
  })
  public endTime: Date;

  @Column({
    default: 0,
    name: 'dead_balls',
    nullable: false,
    type: 'smallint',
  })
  public deadBalls: number;

  @Column({
    default: 0,
    nullable: false,
    type: 'smallint',
  })
  public innings: number;

  @Column({
    default: false,
    name: 'post_season',
    nullable: false,
    type: 'boolean',
  })
  public postSeason: boolean;

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

  @ManyToOne(type => Match, match => match.games)
  @JoinColumn({
    name: 'match_id',
  })
  public matchId: Match;

  @OneToMany(type => PlayerGame, playerGame => playerGame.gameId)
  public players: PlayerGame[];
}
