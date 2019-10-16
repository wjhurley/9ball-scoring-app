import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Team } from '../team/team.entity';

@Entity()
export class Division {
  @PrimaryColumn({
    nullable: false,
    type: 'int',
  })
  public id: number;

  @Column({
    length: 25,
    nullable: false,
  })
  public name: string;

  @Column({
    name: 'day_of_week',
    nullable: false,
    type: 'smallint',
  })
  public dayOfWeek: number;

  @Column({
    length: 20,
    nullable: false,
  })
  public format: string;

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

  @OneToMany(type => Team, team => team.division)
  public teams: Team[];
}
