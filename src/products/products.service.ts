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

  async findAll(filters: FindProductsDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.repository
      .createQueryBuilder('product')
      .take(limit)
      .skip(offset);

    if (q?.trim()) {
      qb.leftJoinAndSelect('product.company', 'company');
      this.applyTextSearch(qb, q, { includeCompany: true });
    }

    qb.orderBy('product.name', 'ASC').addOrderBy('product.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async findByCompany(companyId: string, filters: FindProductsDto) {
    const { limit = 50, offset = 0, q } = filters;

    const qb = this.repository
      .createQueryBuilder('product')
      .where('product.company_id = :companyId', { companyId })
      .andWhere('product.is_active = :isActive', { isActive: true })
      .take(limit)
      .skip(offset);

    this.applyTextSearch(qb, q, { includeCompany: false });

    qb.orderBy('product.name', 'ASC').addOrderBy('product.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async findActive(filters: FindProductsDto) {
    const { limit = 20, offset = 0, q } = filters;

    const qb = this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.company', 'company')
      .where('product.is_active = :isActive', { isActive: true })
      .take(limit)
      .skip(offset);

    this.applyTextSearch(qb, q, { includeCompany: true });

    qb.orderBy('product.name', 'ASC').addOrderBy('product.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  /** ILIKE en nombre, descripción del producto y nombre comercial de la empresa. */
  private applyTextSearch(
    qb: ReturnType<Repository<Product>['createQueryBuilder']>,
    q: string | undefined,
    options: { includeCompany: boolean },
  ) {
    const term = q?.trim();
    if (!term) {
      return;
    }

    const search = `%${term}%`;
    const conditions = [
      'product.name ILIKE :search',
      'product.description ILIKE :search',
    ];

    if (options.includeCompany) {
      conditions.push('company.commercial_name ILIKE :search');
    }

    qb.andWhere(`(${conditions.join(' OR ')})`, { search });
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
