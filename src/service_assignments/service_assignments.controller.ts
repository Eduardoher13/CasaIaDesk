import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ServiceAssignmentService } from './service_assignments.service';
import { CreateServiceAssignmentDto } from './dto/create-service-assignment.dto';
import { UpdateServiceAssignmentDto } from './dto/update-service-assignment.dto';

@Controller('service-assignments')
export class ServiceAssignmentController {
  constructor(private readonly service: ServiceAssignmentService) {}

  @Post()
  create(@Body() createDto: CreateServiceAssignmentDto) {
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
  update(@Param('id') id: string, @Body() updateDto: UpdateServiceAssignmentDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
