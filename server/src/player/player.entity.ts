import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { User } from '../auth/user.entity';
import { PlayerGame } from '../entity/player-game.entity';
import { PlayerTeam } from '../entity/player-team.entity';
import { SkillLevel } from '../skill-level/skill-level.entity';
import { PlayerFormat } from './player-format.enum';

@Entity()
@Unique('UQ_format_playerNumber', ['format', 'playerNumber'])
export class Player extends BaseEntity {
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
  })
  public createdAt: Date;

  @Column({
    default: PlayerFormat.NINE,
    enum: PlayerFormat,
    nullable: false,
    type: 'enum',
  })
  public format: PlayerFormat;

  @OneToMany(type => PlayerGame, playerGame => playerGame.playerId)
  public games: PlayerGame[];

  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public id: number;

  @Column({
    name: 'player_number',
    nullable: false,
    type: 'int',
  })
  public playerNumber: number;

  @ManyToOne(type => SkillLevel, skillLevel => skillLevel.players)
  @JoinColumn({
    name: 'skill_level',
  })
  public skillLevel: SkillLevel;

  @OneToMany(type => PlayerTeam, playerTeam => playerTeam.playerId)
  public teams: PlayerTeam[];

  @Column({
    default: null,
    name: 'updated_at',
    nullable: true,
    type: 'timestamptz',
  })
  public updatedAt: Date;

  @ManyToOne(type => User, user => user.players)
  @JoinColumn({
    name: 'user_id',
  })
  public userId: User;
}
