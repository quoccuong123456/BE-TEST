import { Injectable } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { DepositService } from '../Database/deposit/deposit.service';
import { WithdrawService } from '../Database/withdraw/withdraw.service';

@Injectable()
export class LendingVaultService {
  constructor(
    private readonly depositService: DepositService,
    private readonly withdrawService: WithdrawService,
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
    console.log('Received handleMessageDeposit event:', {
      ...message,
    });
    if (message.topic === 'withdraw-topic') {
      this.persistToDatabaseWithdraw(message.value);
    } else {
      this.persistToDatabaseDeposit(message.value);
    }
    // Persist to PostgreSQL database
  }

  async persistToDatabaseWithdraw(data: any): Promise<void> {
    this.withdrawService.create(JSON.parse(data));
  }
  async persistToDatabaseDeposit(data: any): Promise<void> {
    this.depositService.create(JSON.parse(data));
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
