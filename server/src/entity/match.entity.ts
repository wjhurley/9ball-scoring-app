import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Game } from './game.entity';
import { Session } from './session.entity';
import { TeamMatch } from './team-match.entity';

@Entity()
export class Match {
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
    name: 'start_time',
    nullable: false,
    type: 'time',
  })
  public startTime: Date;

  @Column({
    default: null,
    name: 'end_time',
    nullable: true,
    type: 'time',
  })
  public endTime: Date;

  @Column({
    name: 'week_number',
    nullable: false,
    type: 'smallint',
  })
  public weekNumber: number;

  @Column({
    default: false,
    name: 'post_season',
    nullable: false,
    type: 'boolean',
  })
  public postSeason: boolean;

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

  @ManyToOne(type => Session, session => session.matches)
  @JoinColumn({
    name: 'session',
  })
  public session: Session;

  @OneToMany(type => Game, game => game.matchId)
  public games: Game[];

  @OneToMany(type => TeamMatch, teamMatch => teamMatch.matchId)
  public teams: TeamMatch[];
}
