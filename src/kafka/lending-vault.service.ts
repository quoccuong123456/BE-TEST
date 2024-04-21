import { Injectable } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { DepositService } from '../deposit/deposit.service';

@Injectable()
export class LendingVaultService {
  constructor(
    private readonly depositService: DepositService,
    private readonly kafkaService: KafkaService,
  ) {
    this.consumeLendingEvents();
  }
  private consumeLendingEvents(): void {
    this.kafkaService.consumeFromTopic(
      'deposit-topic',
      this.handleMessage.bind(this),
    );
    this.kafkaService.consumeFromTopic(
      'withdraw-topic',
      this.handleMessage.bind(this),
    );
  }

  private handleMessage(message: any): void {
    // Handle lending event message here
    console.log('Received lending event:', {
      ...message,
    });
    // Persist to PostgreSQL database
    this.persistToDatabase(message.value);
  }
  async persistToDatabase(data: any): Promise<void> {
    this.depositService.create(data);
  }
  async depositToKafka(amount: number): Promise<void> {
    const message = `Deposit event: ${amount}`;
    await this.kafkaService.publishToTopic('deposit-topic', message);
  }

  async withdrawToKafka(amount: number): Promise<void> {
    const message = `Withdraw event: ${amount}`;
    await this.kafkaService.publishToTopic('withdraw-topic', message);
  }
}
