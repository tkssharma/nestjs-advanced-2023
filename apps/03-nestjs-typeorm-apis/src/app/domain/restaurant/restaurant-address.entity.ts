import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';

@Entity('restaurants_addresses')
export class RestaurantAddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 255, select: true })
  public city!: string;

  @Column({ type: 'varchar', default: null })
  public state!: string;

  @OneToOne(() => RestaurantEntity)
  @JoinColumn({ name: 'restaurant_id', referencedColumnName: 'id' })
  public restaurant: RestaurantEntity;

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
