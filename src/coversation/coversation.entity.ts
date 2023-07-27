import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('coversation')
export class Coversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  coversation_id: bigint;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  avatar: string;

  @Column({ type: 'integer' })
  type: number;

  @Column('integer', { array: true, default: [] })
  members: number[];

  @Column()
  status: number;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  background: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  last_activity: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date;
}
