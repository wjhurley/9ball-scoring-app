import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Player } from './Player';

@Entity('skill_level')
export class SkillLevel {
  @PrimaryGeneratedColumn({
    name: 'skill_id',
    type: 'int',
  })
  public skillId: number;

  @Column({
    name: 'skill_level',
    nullable: false,
    type: 'smallint',
  })
  public skillLevel: number;

  @Column({
    length: 20,
    nullable: false,
  })
  public format: string;

  @Column({
    name: 'points_required',
    nullable: false,
    type: 'smallint',
  })
  public pointsRequired: number;

  @Column({
    default: 1,
    name: 'tournament_tier',
    nullable: false,
    type: 'smallint',
  })
  public tournamentTier: number;

  @OneToMany(type => Player, player => player.skillLevel)
  public players: Player[];
}
