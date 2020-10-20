import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { PlayerFormat } from '../player/player-format.enum';
import { Player } from '../player/player.entity';

@Entity('skill_level')
@Unique('UQ_format_skillLevel', ['format', 'skillLevel'])
export class SkillLevel extends BaseEntity {
  @Column({
    default: PlayerFormat.NINE,
    enum: PlayerFormat,
    nullable: false,
    type: 'enum',
  })
  public format: PlayerFormat;

  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public id: number;

  @OneToMany(type => Player, player => player.skillLevel, {
    cascade: ['insert', 'update', 'remove'],
  })
  public players: Player[];

  @Column({
    default: 0,
    name: 'points_required',
    nullable: false,
    type: 'smallint',
  })
  public pointsRequired: number;

  @Column({
    name: 'skill_level',
    nullable: false,
    type: 'smallint',
  })
  public skillLevel: number;

  @Column({
    default: 1,
    nullable: false,
    type: 'smallint',
  })
  public timeouts: number;

  @Column({
    default: 1,
    name: 'tournament_tier',
    nullable: false,
    type: 'smallint',
  })
  public tournamentTier: number;
}
