import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { toPaginatedResult } from '../common/pagination/pagination.util';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  create(createDto: CreateUserDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async register(registerDto: RegisterDto) {
    const existing = await this.repository.findOne({
      where: { email: registerDto.email },
    });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const user = await this.repository.save(
      this.repository.create({
        email: registerDto.email,
        password_hash: registerDto.password,
        role: registerDto.role,
        first_name: registerDto.first_name,
        last_name: registerDto.last_name,
        phone: registerDto.phone,
        avatar_url: registerDto.avatar_url,
        is_active: registerDto.is_active ?? true,
        lat: registerDto.lat,
        lng: registerDto.lng,
        city: registerDto.city,
      }),
    );

    return this.sanitizeUser(user);
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOne({
      where: { email: decodeURIComponent(email) },
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return this.sanitizeUser(user);
  }

  async updateLocation(id: string, locationDto: UpdateLocationDto) {
    const user = await this.findOne(id);
    user.lat = locationDto.lat;
    user.lng = locationDto.lng;
    if (locationDto.city !== undefined) {
      user.city = locationDto.city;
    }
    const saved = await this.repository.save(user);
    return this.sanitizeUser(saved);
  }

  async findAll(filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('user')
      .where('user.deleted_at IS NULL')
      .take(limit)
      .skip(offset);

    qb.orderBy('user.created_at', 'DESC').addOrderBy('user.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('User #' + id + ' not found');
    return entity;
  }

  async update(id: string, updateDto: UpdateUserDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repository.softRemove(entity);
  }

  private sanitizeUser(user: User) {
    const { password_hash: _, ...safe } = user;
    return safe;
  }
}
