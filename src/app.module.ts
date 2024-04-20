import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';

import { DepositEntity } from './deposit/deposit.entity';
import { DepositModule } from './deposit/deposit.module';
import { KafkaModule } from './kafka/kafka.module';
import { KafkaService } from './kafka/kafka.service';

@Module({
  imports: [
    DepositModule,
    KafkaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'roundhouse.proxy.rlwy.net',
      port: 36872,
      username: 'postgres',
      password: 'LQYEqKBZmnyynismwQRokecQXGCgynEJ',
      database: 'railway',
      entities: [DepositEntity],
      synchronize: true, // Chỉ sử dụng trong môi trường development
    }),
    KafkaModule,
    // TypeOrmModule.forFeature([DepositEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, KafkaService],
})
export class AppModule {
  constructor(private readonly kafkaService: KafkaService) {}

  async onApplicationBootstrap() {
    console.log('xem log onApplicationBootstrap');

    // await this.kafkaService.connect();
    // await this.kafkaService.subscribe('test-topic');
  }
}
