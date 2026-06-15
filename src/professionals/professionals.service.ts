import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { toPaginatedResult } from '../common/pagination/pagination.util';
import { Professional } from './entities/professional.entity';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectRepository(Professional)
    private readonly repository: Repository<Professional>,
  ) {}

  create(createDto: CreateProfessionalDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async findAll(filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('professional')
      .take(limit)
      .skip(offset);

    qb.orderBy('professional.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async findByUserId(userId: string) {
    const professional = await this.repository.findOne({
      where: { user_id: userId },
      relations: { user: true },
    });
    if (!professional) {
      throw new NotFoundException(`Professional for user ${userId} not found`);
    }
    return this.sanitizeProfessional(professional);
  }

  async findAvailable(filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('professional')
      .leftJoinAndSelect('professional.user', 'user')
      .where('professional.is_available = :isAvailable', { isAvailable: true })
      .take(limit)
      .skip(offset);

    qb.orderBy('professional.avg_rating', 'DESC').addOrderBy(
      'professional.id',
      'DESC',
    );

    const [rows, total] = await qb.getManyAndCount();
    const data = rows.map((p) => this.sanitizeProfessional(p));
    return toPaginatedResult(data, total, limit, offset);
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Professional #' + id + ' not found');
    return entity;
  }

  async update(id: string, updateDto: UpdateProfessionalDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }

  private sanitizeProfessional(professional: Professional) {
    if (!professional.user) return professional;
    const { password_hash: _, ...user } = professional.user;
    return { ...professional, user };
  }
}
