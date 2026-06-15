import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { toPaginatedResult } from '../common/pagination/pagination.util';
import { Specialty } from './entities/specialty.entity';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private readonly repository: Repository<Specialty>,
  ) {}

  create(createDto: CreateSpecialtyDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async findAll(filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('specialty')
      .take(limit)
      .skip(offset);

    qb.orderBy('specialty.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async findOne(id: number) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Specialty #' + id + ' not found');
    return entity;
  }

  async update(id: number, updateDto: UpdateSpecialtyDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
