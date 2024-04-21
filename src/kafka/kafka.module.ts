import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { LendingVaultService } from './lending-vault.service';
import { DepositService } from 'src/deposit/deposit.service';

@Module({
  providers: [KafkaService, LendingVaultService, DepositService],
  controllers: [KafkaController],
  exports: [KafkaService],
})
export class KafkaModule {}
