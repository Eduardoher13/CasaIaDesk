import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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

  findAll(skip = 0, take = 10) {
    return this.repository.findAndCount({ skip, take });
  }

  findByCompany(companyId: string, skip = 0, take = 50) {
    return this.repository.findAndCount({
      where: { company_id: companyId, is_active: true },
      order: { name: 'ASC' },
      skip,
      take,
    });
  }

  findActive(skip = 0, take = 20, search?: string) {
    const qb = this.repository
      .createQueryBuilder('product')
      .where('product.is_active = :isActive', { isActive: true });

    if (search?.trim()) {
      qb.andWhere('product.name ILIKE :search', {
        search: `%${search.trim()}%`,
      });
    }

    return qb
      .orderBy('product.name', 'ASC')
      .skip(skip)
      .take(take)
      .getManyAndCount();
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
