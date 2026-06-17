import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ProfessionalSpecialtyService } from './professional_specialties.service';
import { CreateProfessionalSpecialtyDto } from './dto/create-professional-specialty.dto';
import { UpdateProfessionalSpecialtyDto } from './dto/update-professional-specialty.dto';

@Controller('professional-specialties')
export class ProfessionalSpecialtyController {
  constructor(private readonly service: ProfessionalSpecialtyService) {}

  @Post()
  create(@Body() createDto: CreateProfessionalSpecialtyDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query() filters: PaginationQueryDto) {
    return this.service.findAll(filters);
  }

  @Get('by-professional/:professionalId')
  findByProfessional(@Param('professionalId') professionalId: string) {
    return this.service.findByProfessional(professionalId);
  }

  @Get(':professional_id/:specialty_id')
  findOne(@Param('professional_id') professional_id: string, @Param('specialty_id') specialty_id: number) {
    return this.service.findOne(professional_id, specialty_id);
  }

  @Patch(':professional_id/:specialty_id')
  update(@Param('professional_id') professional_id: string, @Param('specialty_id') specialty_id: number, @Body() updateDto: UpdateProfessionalSpecialtyDto) {
    return this.service.update(professional_id, specialty_id, updateDto);
  }

  @Delete(':professional_id/:specialty_id')
  remove(@Param('professional_id') professional_id: string, @Param('specialty_id') specialty_id: number) {
    return this.service.remove(professional_id, specialty_id);
  }
}
