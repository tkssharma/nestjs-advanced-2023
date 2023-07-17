import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { RestaurantEntity } from "./restaurant.entity";

@Entity("restaurant_address")
export class RestaurantAddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: "varchar", length: 255, select: true })
  public name!: string;

  @Column({ type: "varchar" })
  public city!: string;

  @Column({ type: "varchar" })
  public street!: string;

  @Column({ type: "varchar", length: 255 })
  public pincode!: string;

  @Column({ type: "varchar", length: 255 })
  public country!: string;

  @Column({ type: "varchar", length: 255 })
  public state!: string;

  @OneToOne(() => RestaurantEntity)
  @JoinColumn({ name: "restaurant_id", referencedColumnName: "id" })
  restaurant: RestaurantEntity;

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    select: true,
  })
  public created_at!: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    select: true,
  })
  public updated_at!: Date;
}
