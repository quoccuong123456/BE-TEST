import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';

import { DepositEntity } from './Database/deposit/deposit.entity';
import { DepositModule } from './Database/deposit/deposit.module';
import { KafkaModule } from './kafka/kafka.module';
import { KafkaService } from './kafka/kafka.service';
import { ConfigModule } from '@nestjs/config';
import { DepositService } from './Database/deposit/deposit.service';
import { LendingVaultService } from './kafka/lending-vault.service';
import { WithdrawModule } from './Database/withdraw/withdraw.module';
import { WithdrawEntity } from './Database/withdraw/withdraw.entity';
import { WithdrawService } from './Database/withdraw/withdraw.service';

@Module({
  imports: [
    DepositModule,
    WithdrawModule,
    KafkaModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: 'postgres',
      password: process.env.PW,
      database: 'railway',
      entities: [DepositEntity, WithdrawEntity],
      synchronize: true, // Chỉ sử dụng trong môi trường development
    }),
    TypeOrmModule.forFeature([DepositEntity, WithdrawEntity]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    KafkaService,
    DepositService,
    LendingVaultService,
    WithdrawService,
  ],
})
export class AppModule {}
