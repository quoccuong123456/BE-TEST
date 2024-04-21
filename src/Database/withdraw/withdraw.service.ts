import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WithdrawEntity } from './withdraw.entity';

@Injectable()
export class WithdrawService {
  constructor(
    @InjectRepository(WithdrawEntity)
    private withdrawRepository: Repository<WithdrawEntity>,
  ) {}

  async findAll(): Promise<WithdrawEntity[]> {
    return this.withdrawRepository.find();
  }
  async create(withdraw: WithdrawEntity): Promise<WithdrawEntity> {
    console.log('Cường xem data withdraw truyền vào', withdraw);

    return this.withdrawRepository.save(withdraw);
  }
  async remove(id: number): Promise<void> {
    await this.withdrawRepository.delete(id);
  }
}
