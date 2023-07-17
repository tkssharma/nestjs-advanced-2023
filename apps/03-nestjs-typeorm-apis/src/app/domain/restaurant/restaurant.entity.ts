import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { RestaurantDishEntity } from './restaurant-dish.entity';
import { RestaurantAddressEntity } from './restaurant-address.entity';

@Entity('restaurants')
export class RestaurantEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 255, select: true })
  public name!: string;

  @Column({ type: 'varchar', default: null })
  public description!: string;

  @OneToMany(() => RestaurantDishEntity, (event) => event.restaurant)
  public dishes: RestaurantDishEntity[];

  @OneToOne(() => RestaurantAddressEntity)
  address: RestaurantAddressEntity;

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
