import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { LendingVaultService } from './lending-vault.service';
import { DepositService } from 'src/Database/deposit/deposit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositEntity } from 'src/Database/deposit/deposit.entity';
import { WithdrawService } from 'src/Database/withdraw/withdraw.service';
import { WithdrawEntity } from 'src/Database/withdraw/withdraw.entity';

@Module({
  providers: [
    KafkaService,
    LendingVaultService,
    DepositService,
    WithdrawService,
  ],
  controllers: [KafkaController],
  exports: [KafkaService],
  imports: [TypeOrmModule.forFeature([DepositEntity, WithdrawEntity])],
})
export class KafkaModule {}
