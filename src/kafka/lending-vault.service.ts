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
    this.kafkaService.consumeFromTopic(
      'deposit-topic-update',
      this.handleUpdateDeposit.bind(this),
    );
  }
  async handleUpdateDeposit(message: any): Promise<void> {
    try {
      const { id, newData } = message;
      await this.depositService.updateDeposit(id, newData);
      console.log('Deposit updated successfully:', message);
    } catch (error) {
      console.error('Error updating deposit:', error);
    }
  }
  private handleMessage(message: any): void {
    // Handle lending event message here
    console.log('Received handleMessageDeposit event:', {
      ...message,
    });
    switch (message.topic) {
      case 'withdraw-topic':
        this.persistToDatabaseWithdraw(message.value);

        break;
      case 'deposit-topic':
        this.persistToDatabaseDeposit(message.value);
        break;
      case 'deposit-topic-update':
        this.persistToDatabaseDepositUpdate(message.value);
        break;
      default:
        break;
    }

    // Persist to PostgreSQL database
  }
  async persistToDatabaseDepositUpdate(data: any): Promise<void> {
    const dataParse = JSON.parse(data);
    this.depositService.updateDeposit(dataParse.id, dataParse);
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
