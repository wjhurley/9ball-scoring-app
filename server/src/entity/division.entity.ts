import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Team } from '../team/team.entity';

@Entity()
export class Division extends BaseEntity {
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
  })
  public createdAt: Date;

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

  @OneToMany(type => Team, team => team.division)
  public teams: Team[];

  @Column({
    default: null,
    name: 'updated_at',
    nullable: true,
    type: 'timestamptz',
  })
  public updatedAt: Date;
}
