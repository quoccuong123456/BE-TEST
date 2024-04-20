import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DepositEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  hash: string;

  @Column()
  fromAddress: string;
  @Column()
  toAddress: string;

  @Column()
  ownerAddress: string;
  @Column()
  amountDeposit: number;
}
