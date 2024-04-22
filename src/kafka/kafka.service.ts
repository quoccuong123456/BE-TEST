import { Injectable } from '@nestjs/common';
import { CloudEvent } from 'cloudevents';
import { Consumer, Kafka, Producer } from 'kafkajs';
import { DepositEntity } from 'src/Database/deposit/deposit.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  constructor() {
    this.kafka = new Kafka({
      clientId: 'your-client-id', // Thay thế bằng client ID của bạn
      brokers: ['localhost:9092'], // Thay thế bằng địa chỉ Kafka broker của bạn
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'test-group' });
  }
  async publishToTopic(topic: string, message: string): Promise<void> {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
    await this.producer.disconnect();
  }
  async consumeFromTopic(
    topic: string,
    callback: (message: any) => void,
  ): Promise<void> {
    await this.consumer.subscribe({ topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        callback({
          topic,
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
      },
    });
  }
  async connect(): Promise<void> {
    await this.producer.connect();
    await this.consumer.connect();
  }
  generateUuid(): string {
    return uuidv4(); // Tạo và trả về một UUID mới
  }
  async sendMessage(topic: string, message: DepositEntity): Promise<void> {
    const cloudEvent = new CloudEvent({
      type: topic,
      specversion: process.env.EVENT_SPEC_VERSION,
      data: { ...message, unixTimestamp: Date.now() },
      id: uuidv4(),
      time: new Date().toISOString(),
    });
    console.log('cuong xem send message', topic, JSON.stringify(cloudEvent));
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(cloudEvent) }],
      });
    } catch (error) {
      console.log('123', error);
    }
  }
  async sendMessageUpdate(
    topic: string,
    idUpdate: string,
    message: DepositEntity,
  ): Promise<void> {
    const cloudEvent = new CloudEvent({
      type: topic,
      specversion: process.env.EVENT_SPEC_VERSION,
      data: { ...message },
      id: idUpdate,
    });
    console.log('cuong xem send message', topic, JSON.stringify(cloudEvent));
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(cloudEvent) }],
      });
    } catch (error) {
      console.log('123', error);
    }
  }
  async disconnect(): Promise<void> {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }
}
