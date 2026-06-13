import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
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
  findAll(@Query('skip') skip = '0', @Query('take') take = '10') {
    return this.service.findAll(parseInt(skip), parseInt(take));
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
