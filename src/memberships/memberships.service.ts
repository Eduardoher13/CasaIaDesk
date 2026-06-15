import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { toPaginatedResult } from '../common/pagination/pagination.util';
import { Membership } from './entities/membership.entity';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly repository: Repository<Membership>,
  ) {}

  create(createDto: CreateMembershipDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async findAll(filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('membership')
      .take(limit)
      .skip(offset);

    qb.orderBy('membership.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async findOne(id: number) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Membership #' + id + ' not found');
    return entity;
  }

  async update(id: number, updateDto: UpdateMembershipDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
