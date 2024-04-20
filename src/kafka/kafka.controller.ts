import { Body, Controller, Post } from '@nestjs/common';
import {
  MessagePattern,
  EventPattern,
  Payload,
  Ctx,
} from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}
  async onModuleInit() {
    await this.kafkaService.connect();
  }
  @Post('send-message')
  async sendMessage(@Body() message: any) {
    try {
      console.log('test message 1', message);
      await this.kafkaService.sendMessage('test-topic', message);
      return { success: true, message: 'Message sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send message', error };
    }
  }
  @MessagePattern('test-topic')
  async handleMesKafkaMessage(@Payload() message: any, @Ctx() context: any) {
    console.log('Received Kafka message:', message, context);

    // Xử lý dữ liệu nhận được từ Kafka
  }
  @EventPattern('test-topic')
  async handleEventKafkaMessage(@Payload() message: any, @Ctx() context: any) {
    console.log('event Kafka message:', message, context);
    // Xử lý dữ liệu nhận được từ Kafka
  }
}
