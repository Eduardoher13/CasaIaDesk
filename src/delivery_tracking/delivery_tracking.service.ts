import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryTracking } from './entities/delivery-tracking.entity';
import { CreateDeliveryTrackingDto } from './dto/create-delivery-tracking.dto';
import { UpdateDeliveryTrackingDto } from './dto/update-delivery-tracking.dto';

@Injectable()
export class DeliveryTrackingService {
  constructor(
    @InjectRepository(DeliveryTracking)
    private readonly repository: Repository<DeliveryTracking>,
  ) {}

  create(createDto: CreateDeliveryTrackingDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  findAll(skip = 0, take = 10) {
    return this.repository.findAndCount({ skip, take });
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('DeliveryTracking #' + id + ' not found');
    return entity;
  }

  async update(id: string, updateDto: UpdateDeliveryTrackingDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
