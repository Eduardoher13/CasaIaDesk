import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { toPaginatedResult } from '../common/pagination/pagination.util';
import { Company } from './entities/company.entity';
import { Product } from '../products/entities/product.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createDto: CreateCompanyDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async findAll(filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('company')
      .take(limit)
      .skip(offset);

    qb.orderBy('company.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async findByUserId(userId: string) {
    const company = await this.repository.findOne({
      where: { user_id: userId },
    });
    if (!company) {
      throw new NotFoundException(`Company for user ${userId} not found`);
    }
    return company;
  }

  async getStorefront(id: string, filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;
    const company = await this.findOne(id);

    const qb = this.productRepository
      .createQueryBuilder('product')
      .where('product.company_id = :companyId', { companyId: id })
      .andWhere('product.is_active = :isActive', { isActive: true })
      .take(limit)
      .skip(offset);

    qb.orderBy('product.name', 'ASC').addOrderBy('product.id', 'DESC');

    const [products, total] = await qb.getManyAndCount();

    return {
      company,
      products: toPaginatedResult(products, total, limit, offset),
    };
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Company #' + id + ' not found');
    return entity;
  }

  async update(id: string, updateDto: UpdateCompanyDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
