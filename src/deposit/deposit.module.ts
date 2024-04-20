import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositEntity } from './deposit.entity';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DepositEntity])],
  providers: [DepositService],
  controllers: [DepositController],
})
export class DepositModule {}
