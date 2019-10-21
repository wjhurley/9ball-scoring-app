import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Match } from './match.entity';

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public id: number;

  @OneToMany(type => Match, match => match.session)
  public matches: Match[];

  @Column({
    length: 10,
    name: 'session_name',
    nullable: false,
  })
  public sessionName: string;

  @Column({
    nullable: false,
    type: 'date',
  })
  public year: Date;
}
