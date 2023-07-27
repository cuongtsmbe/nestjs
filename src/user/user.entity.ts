import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  user_id: bigint;

  @Column({ type: 'text' })
  avatar: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'text' })
  street: string;

  @Column({ type: 'text' })
  lat: string;

  @Column({ type: 'text' })
  lng: string;

  @Column({ type: 'int' })
  country_id: number;

  @Column({ type: 'int' })
  city_id: number;

  @Column({ type: 'int' })
  district_id: number;

  @Column({ type: 'int' })
  ward_id: number;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  gender: string;

  @Column({ type: 'text' })
  birthday: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;
}
