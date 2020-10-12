import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Team } from '../team/team.entity';

@Entity('host_location')
@Unique('UQ_address_name_phoneNumber', ['address', 'name', 'phoneNumber'])
export class HostLocation extends BaseEntity {
  @Column({
    length: 100,
    nullable: false,
  })
  public address: string;

  @Column({
    length: 20,
    nullable: false,
  })
  public city: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
  })
  public createdAt: Date;

  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public id: number;

  @Column({
    length: 30,
    nullable: false,
  })
  public name: string;

  @Column({
    name: 'phone_number',
    nullable: false,
    precision: 10,
    scale: 0,
    type: 'numeric',
  })
  public phoneNumber: number;

  @Column({
    length: 2,
    nullable: false,
  })
  public state: string;

  @OneToMany(type => Team, team => team.hostLocation)
  public teams: Team[];

  @Column({
    default: null,
    name: 'updated_at',
    nullable: true,
    type: 'timestamptz',
  })
  public updatedAt: Date;

  @Column({
    name: 'zip_code',
    nullable: false,
    precision: 5,
    scale: 0,
    type: 'numeric',
  })
  public zipCode: number;
}
