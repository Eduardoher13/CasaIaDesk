import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { toPaginatedResult } from '../common/pagination/pagination.util';
import { ProfessionalSpecialty } from './entities/professional-specialty.entity';
import { CreateProfessionalSpecialtyDto } from './dto/create-professional-specialty.dto';
import { UpdateProfessionalSpecialtyDto } from './dto/update-professional-specialty.dto';

@Injectable()
export class ProfessionalSpecialtyService {
  constructor(
    @InjectRepository(ProfessionalSpecialty)
    private readonly repository: Repository<ProfessionalSpecialty>,
  ) {}

  create(createDto: CreateProfessionalSpecialtyDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async findAll(filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('professionalSpecialty')
      .take(limit)
      .skip(offset);

    qb.orderBy('professionalSpecialty.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async findOne(professional_id: string, specialty_id: number) {
    const entity = await this.repository.findOne({ where: { professional_id, specialty_id } });
    if (!entity) throw new NotFoundException('ProfessionalSpecialty not found');
    return entity;
  }

  async update(professional_id: string, specialty_id: number, updateDto: UpdateProfessionalSpecialtyDto) {
    const entity = await this.findOne(professional_id, specialty_id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(professional_id: string, specialty_id: number) {
    const entity = await this.findOne(professional_id, specialty_id);
    await this.repository.remove(entity);
  }
}
