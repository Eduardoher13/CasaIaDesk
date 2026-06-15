import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ServiceOfferService } from './service_offers.service';
import { CreateServiceOfferDto } from './dto/create-service-offer.dto';
import { UpdateServiceOfferDto } from './dto/update-service-offer.dto';

@Controller('service-offers')
export class ServiceOfferController {
  constructor(private readonly service: ServiceOfferService) {}

  @Post()
  create(@Body() createDto: CreateServiceOfferDto) {
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
  update(@Param('id') id: string, @Body() updateDto: UpdateServiceOfferDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
