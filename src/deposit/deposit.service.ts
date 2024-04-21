import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepositEntity } from './deposit.entity';

@Injectable()
export class DepositService {
  constructor(
    @InjectRepository(DepositEntity)
    private depositRepository: Repository<DepositEntity>,
  ) {}

  async findAll(): Promise<DepositEntity[]> {
    return this.depositRepository.find();
  }
  async create(deposit: DepositEntity): Promise<DepositEntity> {
    console.log('Cường xem data truyền vào', deposit);

    return this.depositRepository.save(deposit);
  }
  async remove(id: number): Promise<void> {
    await this.depositRepository.delete(id);
  }
}
