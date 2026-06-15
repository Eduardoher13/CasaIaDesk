import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { toPaginatedResult } from '../common/pagination/pagination.util';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsDto } from './dto/find-products.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  create(createDto: CreateProductDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async findAll(filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('product')
      .take(limit)
      .skip(offset);

    qb.orderBy('product.name', 'ASC').addOrderBy('product.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async findByCompany(companyId: string, filters: PaginationQueryDto) {
    const { limit = 50, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('product')
      .where('product.company_id = :companyId', { companyId })
      .andWhere('product.is_active = :isActive', { isActive: true })
      .take(limit)
      .skip(offset);

    qb.orderBy('product.name', 'ASC').addOrderBy('product.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async findActive(filters: FindProductsDto) {
    const { limit = 20, offset = 0, q } = filters;

    const qb = this.repository
      .createQueryBuilder('product')
      .where('product.is_active = :isActive', { isActive: true })
      .take(limit)
      .skip(offset);

    if (q?.trim()) {
      const search = `%${q.trim()}%`;
      qb.andWhere('product.name ILIKE :search', { search });
    }

    qb.orderBy('product.name', 'ASC').addOrderBy('product.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async setImageUrl(id: string, imageUrl: string) {
    const product = await this.findOne(id);
    product.image_url = imageUrl;
    return this.repository.save(product);
  }

  async updateStock(id: string, delta: number) {
    const product = await this.findOne(id);
    const newStock = product.stock + delta;
    if (newStock < 0) {
      throw new BadRequestException('Stock cannot be negative');
    }
    product.stock = newStock;
    return this.repository.save(product);
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Product #' + id + ' not found');
    return entity;
  }

  async update(id: string, updateDto: UpdateProductDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
