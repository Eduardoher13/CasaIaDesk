import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findAll(skip = 0, take = 10) {
    return this.repository.findAndCount({ skip, take });
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

  async findAvailable(skip = 0, take = 10) {
    const [data, total] = await this.repository.findAndCount({
      where: { is_available: true },
      relations: { user: true },
      order: { avg_rating: 'DESC' },
      skip,
      take,
    });
    return [data.map((p) => this.sanitizeProfessional(p)), total] as const;
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
