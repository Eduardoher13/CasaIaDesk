import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { toPaginatedResult } from '../common/pagination/pagination.util';
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly repository: Repository<Delivery>,
  ) {}

  create(createDto: CreateDeliveryDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async findAll(filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('delivery')
      .take(limit)
      .skip(offset);

    qb.orderBy('delivery.created_at', 'DESC').addOrderBy('delivery.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Delivery #' + id + ' not found');
    return entity;
  }

  async update(id: string, updateDto: UpdateDeliveryDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
