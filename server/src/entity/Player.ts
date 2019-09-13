import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { SkillLevel } from './SkillLevel';

@Entity()
export class Player {
  @PrimaryColumn({
    name: 'player_id',
    nullable: false,
    type: 'int',
  })
  playerId: number;

  @Column({
    length: 25,
    name: 'first_name',
    nullable: false,
  })
  firstName: string;

  @Column({
    length: 50,
    name: 'last_name',
    nullable: false,
  })
  lastName: string;

  @Column({
    length: 50,
    nullable: false,
  })
  email: string;

  @Column({
    length: 50,
    nullable: false,
  })
  pass: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
  })
  createdAt: Date;
  
  @ManyToOne(type => SkillLevel, skillLevel => skillLevel.players)
  @JoinColumn({
    name: 'skill_level',
  })
  skillLevel: SkillLevel;
}