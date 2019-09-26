import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { Division } from './Division';
import { HostLocation } from './HostLocation';
import { PlayerTeam } from './PlayerTeam';
import { TeamMatch } from './TeamMatch';

@Entity()
export class Team {
  @PrimaryColumn({
    name: 'team_id',
    nullable: false,
    type: 'int',
  })
  public teamId: number;

  @Column({
    length: 50,
    name: 'team_name',
    nullable: false,
  })
  public teamName: string;

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

  @ManyToOne(type => Division, division => division.teams)
  @JoinColumn({
    name: 'division',
  })
  public division: Division;

  @ManyToOne(type => HostLocation, hostLocation => hostLocation.teams)
  @JoinColumn({
    name: 'host_location',
  })
  public hostLocation: HostLocation;

  @OneToMany(type => TeamMatch, teamMatch => teamMatch.teamId)
  public matches: TeamMatch[];

  @OneToMany(type => PlayerTeam, playerTeam => playerTeam.teamId)
  public players: PlayerTeam[];
}
