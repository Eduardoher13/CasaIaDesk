import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { OrderItemService } from './order_items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly service: OrderItemService) {}

  @Post()
  create(@Body() createDto: CreateOrderItemDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query() filters: PaginationQueryDto) {
    return this.service.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateOrderItemDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
