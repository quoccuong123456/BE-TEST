import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositEntity } from './deposit.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('deposits')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}
  @ApiOperation({ summary: 'Get all deposit from database' })
  @ApiResponse({
    status: 200,
    description: 'Get all deposit from database successfully',
    content: {
      'application/json': {
        example: {
          status: HttpStatus.OK,
          message: 'OK',
        },
      },
    },
  })
  @Get()
  findAll(): Promise<DepositEntity[]> {
    return this.depositService.findAll();
  }
  @ApiOperation({ summary: 'Create a deposit to database' })
  @ApiResponse({
    status: 200,
    description: 'Create a deposit to database successfully',
    content: {
      'application/json': {
        example: {
          status: HttpStatus.OK,
          message: 'OK',
        },
      },
    },
  })
  @Post()
  create(@Body() data: DepositEntity): Promise<DepositEntity> {
    return this.depositService.create(data);
  }
  @ApiOperation({ summary: 'Delete a deposit in database' })
  @ApiResponse({
    status: 200,
    description: 'Delete a deposit in database successfully',
    content: {
      'application/json': {
        example: {
          status: HttpStatus.OK,
          message: 'OK',
        },
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.depositService.remove(+id);
  }
  @ApiOperation({ summary: 'Update a deposit in database' })
  @ApiResponse({
    status: 200,
    description: 'Update a deposit in database successfully',
    content: {
      'application/json': {
        example: {
          status: HttpStatus.OK,
          message: 'OK',
        },
      },
    },
  })
  @Put(':id')
  edit(
    @Param('id') id: string,
    @Body() data: DepositEntity,
  ): Promise<DepositEntity> {
    return this.depositService.updateDeposit(id, data);
  }
}
