import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findAll(skip = 0, take = 10) {
    return this.repository.findAndCount({ skip, take });
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

  async getStorefront(id: string) {
    const company = await this.findOne(id);
    const products = await this.productRepository.find({
      where: { company_id: id, is_active: true },
      order: { name: 'ASC' },
    });
    return { company, products };
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
