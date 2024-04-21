import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositEntity } from './deposit.entity';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { KafkaService } from 'src/kafka/kafka.service';
import { LendingVaultService } from 'src/kafka/lending-vault.service';
import { WithdrawService } from '../withdraw/withdraw.service';
import { WithdrawEntity } from '../withdraw/withdraw.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepositEntity, WithdrawEntity])],
  providers: [
    DepositService,
    KafkaService,
    LendingVaultService,
    WithdrawService,
  ],
  controllers: [DepositController],
})
export class DepositModule {}
