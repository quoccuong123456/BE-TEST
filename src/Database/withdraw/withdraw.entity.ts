import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WithdrawEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;
  @Column()
  type: string;
  @Column()
  specversion: string;
  @Column()
  @Column({ type: 'jsonb' })
  data: {
    hash: string;
    fromAddress: string;
    toAddress: string;
    ownerAddress: string;
    amountDeposit: number;
    unixTimestamp: number;
  };
}
