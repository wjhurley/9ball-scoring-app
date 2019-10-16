import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Player } from '../player/player.entity';
import { Team } from '../team/team.entity';

@Entity('player_team')
export class PlayerTeam {
  @Column({
    default: false,
    name: 'captain',
    nullable: false,
    type: 'boolean',
  })
  public captain: boolean;

  @Column({
    default: false,
    name: 'co_captain',
    nullable: false,
    type: 'boolean',
  })
  public coCaptain: boolean;

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

  @ManyToOne(type => Player, player => player.teams, { primary: true })
  @JoinColumn({
    name: 'player_id',
  })
  public playerId: Player;

  @ManyToOne(type => Team, team => team.players, { primary: true })
  @JoinColumn({
    name: 'team_id',
  })
  public teamId: Team;
}
