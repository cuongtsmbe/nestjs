import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @PrimaryColumn({ type: 'bigint' })
  user_id: bigint;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'text', nullable: true })
  street: string;

  @Column({ type: 'text' })
  lat: string;

  @Column({ type: 'text' })
  lng: string;

  @Column({ type: 'int', nullable: true })
  country_id: number;

  @Column({ type: 'int', nullable: true })
  city_id: number;

  @Column({ type: 'int', nullable: true })
  district_id: number;

  @Column({ type: 'int', nullable: true })
  ward_id: number;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  gender: string;

  @Column({ type: 'text', nullable: true })
  birthday: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date;
}
