import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../auth/user.entity';
import { PlayerGame } from '../entity/player-game.entity';
import { PlayerTeam } from '../entity/player-team.entity';
import { SkillLevel } from '../entity/skill-level.entity';

@Entity()
export class Player extends BaseEntity {
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
  })
  public createdAt: Date;

  @Column({
    length: 20,
    nullable: false,
  })
  public format: string;

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
