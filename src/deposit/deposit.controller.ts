import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositEntity } from './deposit.entity';

@Controller('deposits')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Get()
  findAll(): Promise<DepositEntity[]> {
    return this.depositService.findAll();
  }

  @Post()
  create(@Body() user: DepositEntity): Promise<DepositEntity> {
    return this.depositService.create(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.depositService.remove(+id);
  }
}
