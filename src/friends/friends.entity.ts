import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('friends')
export class Friends {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  user_id_1: bigint;

  @Column({ type: 'bigint' })
  user_id_2: bigint;


  @Column()
  status: number;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date;
}
