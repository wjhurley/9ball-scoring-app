import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Player } from '../player/player.entity';

@Entity('skill_level')
export class SkillLevel {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public id: number;

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
