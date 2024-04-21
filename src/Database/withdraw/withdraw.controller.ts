import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WithdrawService } from './withdraw.service';
import { WithdrawEntity } from './withdraw.entity';

@Controller('withdraws')
export class WithdrawController {
  constructor(private readonly withdrawService: WithdrawService) {}

  @Get()
  findAll(): Promise<WithdrawEntity[]> {
    return this.withdrawService.findAll();
  }

  @Post()
  create(@Body() data: WithdrawEntity): Promise<WithdrawEntity> {
    return this.withdrawService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.withdrawService.remove(+id);
  }
}
