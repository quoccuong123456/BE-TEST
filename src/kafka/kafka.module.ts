import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { LendingVaultService } from './lending-vault.service';
import { DepositService } from 'src/deposit/deposit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositEntity } from 'src/deposit/deposit.entity';

@Module({
  providers: [KafkaService, LendingVaultService, DepositService],
  controllers: [KafkaController],
  exports: [KafkaService],
  imports: [TypeOrmModule.forFeature([DepositEntity])],
})
export class KafkaModule {}
