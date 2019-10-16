import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PlayerGame } from '../entity/player-game.entity';
import { PlayerTeam } from '../entity/player-team.entity';
import { SkillLevel } from '../entity/skill-level.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Player {
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

  @Column({
    length: 20,
    nullable: false,
  })
  public format: string;

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

  @ManyToOne(type => User, user => user.players)
  @JoinColumn({
    name: 'user_id',
  })
  public userId: User;

  @ManyToOne(type => SkillLevel, skillLevel => skillLevel.players)
  @JoinColumn({
    name: 'skill_level',
  })
  public skillLevel: SkillLevel;

  @OneToMany(type => PlayerGame, playerGame => playerGame.playerId)
  public games: PlayerGame[];

  @OneToMany(type => PlayerTeam, playerTeam => playerTeam.playerId)
  public teams: PlayerTeam[];
}
