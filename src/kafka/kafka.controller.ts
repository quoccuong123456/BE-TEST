import { Body, Controller, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { KafkaService } from './kafka.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}
  async onModuleInit() {
    await this.kafkaService.connect();
  }

  @ApiOperation({ summary: 'Send message to create deposit to kafka' })
  @ApiResponse({
    status: 200,
    description: 'Message to create deposit sent successfully',
    content: {
      'application/json': {
        example: {
          status: HttpStatus.OK,
          message: 'OK',
        },
      },
    },
  })
  @Post('send-message-deposit')
  async sendMessageDeposit(@Body() message: any) {
    try {
      await this.kafkaService.sendMessage('deposit-topic', message);
      return { success: true, message: 'Message sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send message', error };
    }
  }
  @ApiOperation({ summary: 'Send message to create withdraw to kafka' })
  @ApiResponse({
    status: 200,
    description: 'Message to create withdraw sent successfully',
    content: {
      'application/json': {
        example: {
          status: HttpStatus.OK,
          message: 'OK',
        },
      },
    },
  })
  @Post('send-message-withdraw')
  async sendMessageWithdraw(@Body() message: any) {
    try {
      await this.kafkaService.sendMessage('withdraw-topic', message);
      return { success: true, message: 'Message sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send message', error };
    }
  }
  @ApiOperation({ summary: 'Send message withdraw to kafka' })
  @ApiResponse({
    status: 200,
    description: 'Message withdraw sent successfully',
    content: {
      'application/json': {
        example: {
          status: HttpStatus.OK,
          message: 'OK',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Send message to edit deposit to kafka' })
  @ApiResponse({
    status: 200,
    description: 'Message to edit deposit sent successfully',
    content: {
      'application/json': {
        example: {
          status: HttpStatus.OK,
          message: 'OK',
        },
      },
    },
  })
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
