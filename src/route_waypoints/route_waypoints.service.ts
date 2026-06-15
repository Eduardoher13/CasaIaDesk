import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { toPaginatedResult } from '../common/pagination/pagination.util';
import { RouteWaypoint } from './entities/route-waypoint.entity';
import { CreateRouteWaypointDto } from './dto/create-route-waypoint.dto';
import { UpdateRouteWaypointDto } from './dto/update-route-waypoint.dto';

@Injectable()
export class RouteWaypointService {
  constructor(
    @InjectRepository(RouteWaypoint)
    private readonly repository: Repository<RouteWaypoint>,
  ) {}

  create(createDto: CreateRouteWaypointDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async findAll(filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('routeWaypoint')
      .take(limit)
      .skip(offset);

    qb.orderBy('routeWaypoint.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('RouteWaypoint #' + id + ' not found');
    return entity;
  }

  async update(id: string, updateDto: UpdateRouteWaypointDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
