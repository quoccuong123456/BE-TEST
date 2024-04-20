// kafka.service.ts
import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  //   private consumer: Consumer;
  constructor() {
    this.kafka = new Kafka({
      clientId: 'your-client-id', // Thay thế bằng client ID của bạn
      brokers: ['localhost:9092'], // Thay thế bằng địa chỉ Kafka broker của bạn
    });

    console.log('2');
    this.producer = this.kafka.producer();
    // this.consumer = this.kafka.consumer({ groupId: 'test-group' });
  }

  async connect(): Promise<void> {
    console.log('3');
    await this.producer.connect();

    // await this.consumer.connect();
    // await this.producer.transaction();
  }

  async sendMessage(topic: string, message: string): Promise<void> {
    console.log('cuong xem send message', topic, message, this.producer.events);
    // await this.producer.connect();
    try {
      await this.producer.send({
        topic,
        // messages: [],
        messages: [{ value: 'message' }],
      });
    } catch (error) {
      console.log('123', error);
    }
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
    // await this.consumer.disconnect();
  }
}
