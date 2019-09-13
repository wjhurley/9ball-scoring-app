import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { Player } from './Player';

@Entity()
export class SkillLevel {
  @PrimaryColumn({
    name: 'skill_id',
    nullable: false,
    type: 'smallint',
  })
  skillId: number;

  @Column({
    name: 'points_required',
    nullable: false,
    type: 'smallint',
  })
  pointsRequired: number;

  @Column({
    default: 1,
    name: 'tournament_tier',
    nullable: false,
    type: 'smallint',
  })
  tournamentTier: number;

  @OneToMany(type => Player, player => player.skillLevel)
  players: Player[];
}