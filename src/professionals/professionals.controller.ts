import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ProfessionalService } from './professionals.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';

@Controller('professionals')
export class ProfessionalController {
  constructor(private readonly service: ProfessionalService) {}

  @Post()
  create(@Body() createDto: CreateProfessionalDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query() filters: PaginationQueryDto) {
    return this.service.findAll(filters);
  }

  @Get('available')
  findAvailable(@Query() filters: PaginationQueryDto) {
    return this.service.findAvailable(filters);
  }

  @Get('by-user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.service.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProfessionalDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
