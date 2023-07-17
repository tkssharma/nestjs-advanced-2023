import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { AddressInfoDto } from './user.dto';

@Entity('users_addresses')
export class UsersAddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 255, select: true })
  public city!: string;

  @Column({ type: 'varchar', length: 255, select: true })
  public state!: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public updated_at!: Date;
}
