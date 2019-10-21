import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Team } from '../team/team.entity';
import { Match } from './match.entity';

@Entity('team_match')
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

  @ManyToOne(type => Match, match => match.teams, { primary: true })
  @JoinColumn({
    name: 'match_id',
  })
  public matchId: Match;

  @ManyToOne(type => Team, team => team.matches, { primary: true })
  @JoinColumn({
    name: 'team_id',
  })
  public teamId: Team;

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
