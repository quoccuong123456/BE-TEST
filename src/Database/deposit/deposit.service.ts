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
  async updateDeposit(id: string, newData: any): Promise<DepositEntity> {
    // Fetch the deposit entity from the database
    const deposit = await this.depositRepository.findOne({ where: { id } });

    if (!deposit) {
      throw new Error('Deposit not found');
    }

    // Update the entity with the new data
    deposit.type = newData.type;
    deposit.specversion = newData.specversion;
    deposit.data = newData.data;
    console.log('cuong xem data change', deposit);
    return;
    // Save the updated entity back to the database
    // return await this.depositRepository.save(deposit);
  }
  async remove(id: number): Promise<void> {
    await this.depositRepository.delete(id);
  }
}
