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

@Entity('restaurants')
export class RestaurantEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 255, select: true })
  public name!: string;

  @Column({ type: 'varchar', default: null })
  public description!: string;

  @Column({ type: 'varchar', default: null })
  public type!: string;

  @Column({ type: 'varchar', default: null })
  public website_url!: string;

  @Column({ type: 'varchar', default: null })
  public title!: string;

  @Column({ type: 'jsonb', default: null })
  public social_links!: any;

  @Column({ type: 'varchar', default: null })
  public cuisine!: string;

  @Column({ type: 'int', default: null })
  public ratings!: string;

  @Column({ type: 'int', default: null })
  public average_price!: number;

  @Column({ type: 'varchar' })
  public latitude!: string;

  @Column({ type: 'varchar' })
  public longitude!: string;

  @Column({ type: 'varchar', default: null })
  public contact_no!: string;

  @Column({ type: 'jsonb', default: null })
  public thumbnails!: any;

  @Column({ type: 'int', default: null })
  public delivery_time!: number;

  @Column({ type: 'varchar', default: null })
  public delivery_options!: string;

  @Column({ type: 'varchar' })
  public pickup_options!: string;

  @Column({ type: 'varchar' })
  public opens_at!: string;

  @Column({ type: 'jsonb', default: null })
  public restaurant_address!: any;

  @Column({ type: 'varchar' })
  public closes_at!: string;

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

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public deleted_at!: Date;
}
