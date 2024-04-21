import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WithdrawEntity } from './withdraw.entity';
import { WithdrawService } from './withdraw.service';
import { WithdrawController } from './withdraw.controller';
import { KafkaService } from '../../kafka/kafka.service';
import { LendingVaultService } from '../../kafka/lending-vault.service';
import { DepositEntity } from '../deposit/deposit.entity';
import { DepositService } from '../deposit/deposit.service';

@Module({
  imports: [TypeOrmModule.forFeature([WithdrawEntity, DepositEntity])],
  providers: [
    WithdrawService,
    KafkaService,
    LendingVaultService,
    DepositService,
  ],
  controllers: [WithdrawController],
})
export class WithdrawModule {}
