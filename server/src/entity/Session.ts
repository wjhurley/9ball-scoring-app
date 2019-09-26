import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Match } from './Match';

@Entity()
export class Session {
  @PrimaryGeneratedColumn({
    name: 'session_id',
    type: 'int',
  })
  public sessionId: number;

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

  @OneToMany(type => Match, match => match.session)
  public matches: Match[];
}
