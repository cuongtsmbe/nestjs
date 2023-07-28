import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn()
  @PrimaryColumn({ type: 'bigint' })
  message_id: bigint;

  @Column({ type: 'bigint' })
  coversation_id: bigint;

  @Column({ type: 'bigint' })
  user_id: bigint;

  @Column()
  type: number;

  @Column({ type: 'text' })
  message: string;

  @Column()
  status: number;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date;
}
