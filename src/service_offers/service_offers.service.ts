import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { toPaginatedResult } from '../common/pagination/pagination.util';
import { ServiceOffer } from './entities/service-offer.entity';
import { CreateServiceOfferDto } from './dto/create-service-offer.dto';
import { UpdateServiceOfferDto } from './dto/update-service-offer.dto';

@Injectable()
export class ServiceOfferService {
  constructor(
    @InjectRepository(ServiceOffer)
    private readonly repository: Repository<ServiceOffer>,
  ) {}

  create(createDto: CreateServiceOfferDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async findAll(filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('serviceOffer')
      .take(limit)
      .skip(offset);

    qb.orderBy('serviceOffer.created_at', 'DESC').addOrderBy('serviceOffer.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('ServiceOffer #' + id + ' not found');
    return entity;
  }

  async update(id: string, updateDto: UpdateServiceOfferDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
