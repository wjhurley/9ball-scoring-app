import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Player } from '../player/player.entity';
import { Team } from '../team/team.entity';

@Entity('player_team')
@Unique('UQ_player_team', ['player', 'team'])
export class PlayerTeam extends BaseEntity {
  @Column({
    default: false,
    name: 'captain',
    nullable: false,
    type: 'boolean',
  })
  public captain: boolean;

  @Column({
    default: false,
    name: 'co_captain',
    nullable: false,
    type: 'boolean',
  })
  public coCaptain: boolean;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
  })
  public createdAt: Date;

  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public id: number;

  @ManyToOne(type => Player, player => player.teams)
  @JoinColumn({
    name: 'player',
  })
  public player: Player;

  @ManyToOne(type => Team, team => team.players)
  @JoinColumn({
    name: 'team',
  })
  public team: Team;

  @Column({
    default: null,
    name: 'updated_at',
    nullable: true,
    type: 'timestamptz',
  })
  public updatedAt: Date;
}
