import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('oauth')
export class Oauth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  user_id: bigint;

  @Column({ type: 'text' })
  access_token: string;

  @Column()
  status: number;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date;
}
