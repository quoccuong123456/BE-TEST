import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositEntity } from './deposit.entity';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { KafkaService } from 'src/kafka/kafka.service';
import { LendingVaultService } from 'src/kafka/lending-vault.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepositEntity])],
  providers: [DepositService, KafkaService, LendingVaultService],
  controllers: [DepositController],
})
export class DepositModule {}
