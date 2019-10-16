import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Division } from '../entity/division.entity';
import { HostLocation } from '../entity/host-location.entity';
import { PlayerTeam } from '../entity/player-team.entity';
import { TeamMatch } from '../entity/team-match.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public id: number;

  @Column({
    name: 'team_id',
    nullable: false,
    type: 'int',
  })
  public teamNumber: number;

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
