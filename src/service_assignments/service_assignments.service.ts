import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceAssignment } from './entities/service-assignment.entity';
import { CreateServiceAssignmentDto } from './dto/create-service-assignment.dto';
import { UpdateServiceAssignmentDto } from './dto/update-service-assignment.dto';

@Injectable()
export class ServiceAssignmentService {
  constructor(
    @InjectRepository(ServiceAssignment)
    private readonly repository: Repository<ServiceAssignment>,
  ) {}

  create(createDto: CreateServiceAssignmentDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  findAll(skip = 0, take = 10) {
    return this.repository.findAndCount({ skip, take });
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('ServiceAssignment #' + id + ' not found');
    return entity;
  }

  async update(id: string, updateDto: UpdateServiceAssignmentDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
