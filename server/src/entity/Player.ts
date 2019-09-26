import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { PlayerGame } from './PlayerGame';
import { PlayerTeam } from './PlayerTeam';
import { SkillLevel } from './SkillLevel';

@Entity()
export class Player {
  @PrimaryColumn({
    name: 'player_id',
    nullable: false,
    type: 'int',
  })
  public playerId: number;

  @Column({
    length: 25,
    name: 'first_name',
    nullable: false,
  })
  public firstName: string;

  @Column({
    length: 50,
    name: 'last_name',
    nullable: false,
  })
  public lastName: string;

  @Column({
    length: 50,
    nullable: false,
  })
  public email: string;

  @Column({
    length: 50,
    nullable: false,
  })
  public pass: string;

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
