import { Body, Controller, Param, Post, Put } from '@nestjs/common';

import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}
  async onModuleInit() {
    await this.kafkaService.connect();
  }
  @Post('send-message-deposit')
  async sendMessageDeposit(@Body() message: any) {
    try {
      await this.kafkaService.sendMessage('deposit-topic', message);
      return { success: true, message: 'Message sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send message', error };
    }
  }
  @Post('send-message-withdraw')
  async sendMessageWithdraw(@Body() message: any) {
    try {
      await this.kafkaService.sendMessage('withdraw-topic', message);
      return { success: true, message: 'Message sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send message', error };
    }
  }
  @Put('update-deposit/:id')
  async sendMessageEditDeposit(@Param('id') id: string, @Body() message: any) {
    try {
      await this.kafkaService.sendMessageUpdate(
        'deposit-topic-update',
        id,
        message,
      );
      return { success: true, message: 'Message sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send message', error };
    }
  }
}
