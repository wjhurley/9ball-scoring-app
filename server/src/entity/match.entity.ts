import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Session } from '../session/session.entity';
import { Game } from './game.entity';
import { TeamMatch } from './team-match.entity';

@Entity()
export class Match extends BaseEntity {
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
  })
  public createdAt: Date;

  @Column({
    default: null,
    name: 'end_time',
    nullable: true,
    type: 'time',
  })
  public endTime: Date;

  @OneToMany(type => Game, game => game.matchId)
  public games: Game[];

  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public id: number;

  @Column({
    default: () => 'CURRENT_DATE',
    name: 'match_date',
    nullable: false,
    type: 'date',
  })
  public matchDate: Date;

  @Column({
    default: false,
    name: 'post_season',
    nullable: false,
    type: 'boolean',
  })
  public postSeason: boolean;

  @ManyToOne(type => Session, session => session.matches)
  @JoinColumn({
    name: 'session_id',
  })
  public sessionId: Session;

  @Column({
    name: 'start_time',
    nullable: false,
    type: 'time',
  })
  public startTime: Date;

  @OneToMany(type => TeamMatch, teamMatch => teamMatch.matchId)
  public teams: TeamMatch[];

  @Column({
    default: null,
    name: 'updated_at',
    nullable: true,
    type: 'timestamptz',
  })
  public updatedAt: Date;

  @Column({
    name: 'week_number',
    nullable: false,
    type: 'smallint',
  })
  public weekNumber: number;
}
