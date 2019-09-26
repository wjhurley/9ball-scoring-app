import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Match } from './Match';
import { Team } from './Team';

@Entity('team_match')
export class TeamMatch {
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

  @Column({
    default: false,
    nullable: false,
    type: 'boolean',
  })
  public won: boolean;

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
}
