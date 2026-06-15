import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { DeliveryTrackingService } from './delivery_tracking.service';
import { CreateDeliveryTrackingDto } from './dto/create-delivery-tracking.dto';
import { UpdateDeliveryTrackingDto } from './dto/update-delivery-tracking.dto';

@Controller('delivery-tracking')
export class DeliveryTrackingController {
  constructor(private readonly service: DeliveryTrackingService) {}

  @Post()
  create(@Body() createDto: CreateDeliveryTrackingDto) {
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
  update(@Param('id') id: string, @Body() updateDto: UpdateDeliveryTrackingDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
