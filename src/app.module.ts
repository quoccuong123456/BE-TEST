import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';

import { DepositEntity } from './deposit/deposit.entity';
import { DepositModule } from './deposit/deposit.module';
import { KafkaModule } from './kafka/kafka.module';
import { KafkaService } from './kafka/kafka.service';
import { ConfigModule } from '@nestjs/config';
import { DepositService } from './deposit/deposit.service';
import { LendingVaultService } from './kafka/lending-vault.service';

@Module({
  imports: [
    DepositModule,
    KafkaModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: 'postgres',
      password: process.env.PW,
      database: 'railway',
      entities: [DepositEntity],
      synchronize: true, // Chỉ sử dụng trong môi trường development
    }),
    TypeOrmModule.forFeature([DepositEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, KafkaService, DepositService, LendingVaultService],
})
export class AppModule {}
