import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Match } from '../match/match.entity';
import { Team } from '../team/team.entity';

@Entity('team_match')
@Unique('UQ_match_team', ['match', 'team'])
export class TeamMatch extends BaseEntity {
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
  })
  public createdAt: Date;

  @Column({
    default: 0,
    nullable: false,
    type: 'smallint',
  })
  public forfeits: number;

  @Column({
    default: false,
    name: 'home_team',
    nullable: false,
    type: 'boolean',
  })
  public homeTeam: boolean;

  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public id: number;

  @ManyToOne(type => Match, match => match.teams)
  @JoinColumn({
    name: 'match',
  })
  public match: Match;

  @ManyToOne(type => Team, team => team.matches)
  @JoinColumn({
    name: 'team',
  })
  public team: Team;

  @Column({
    default: null,
    name: 'updated_at',
    nullable: true,
    type: 'timestamptz',
  })
  public updatedAt: Date;

  @Column({
    default: false,
    nullable: false,
    type: 'boolean',
  })
  public won: boolean;
}
