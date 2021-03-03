import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Match } from '../match/match.entity';
import { SessionName } from './session-name.enum';

@Entity()
export class Session extends BaseEntity {
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

  @OneToMany(type => Match, match => match.session, {
    cascade: ['insert', 'update', 'remove'],
  })
  public matches: Match[];

  @Column({
    default: SessionName.FALL,
    enum: SessionName,
    nullable: false,
    type: 'enum',
  })
  public name: SessionName;

  @Column({
    default: null,
    name: 'updated_at',
    nullable: true,
    type: 'timestamptz',
  })
  public updatedAt: Date;

  @Column({
    nullable: false,
    type: 'int',
  })
  public year: number;
}
