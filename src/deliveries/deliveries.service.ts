import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { toPaginatedResult } from '../common/pagination/pagination.util';
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { DirectionsQueryDto } from './dto/directions-query.dto';

interface GoogleDirectionsResponse {
  status: string;
  error_message?: string;
  routes: {
    overview_polyline?: { points: string };
    legs?: { distance?: { value: number }; duration?: { value: number } }[];
  }[];
}

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly repository: Repository<Delivery>,
    private readonly configService: ConfigService,
  ) {}

  create(createDto: CreateDeliveryDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async findAll(filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('delivery')
      .take(limit)
      .skip(offset);

    qb.orderBy('delivery.created_at', 'DESC').addOrderBy('delivery.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Delivery #' + id + ' not found');
    return entity;
  }

  async update(id: string, updateDto: UpdateDeliveryDto) {
    const entity = await this.findOne(id);
    if (updateDto.status === 'entregado' && !updateDto.completed_at && !entity.completed_at) {
      updateDto.completed_at = new Date().toISOString();
    }
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }

  /**
   * Consulta Google Directions API y devuelve la ruta lista para crear un delivery.
   */
  async getDirections(query: DirectionsQueryDto) {
    const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
    if (!apiKey) {
      throw new InternalServerErrorException(
        'GOOGLE_MAPS_API_KEY no configurada en el backend',
      );
    }

    const origin = `${query.fromLat},${query.fromLng}`;
    const destination = `${query.toLat},${query.toLng}`;
    const url =
      'https://maps.googleapis.com/maps/api/directions/json' +
      `?origin=${origin}&destination=${destination}` +
      `&mode=driving&key=${apiKey}`;

    let response: Response;
    try {
      response = await fetch(url);
    } catch {
      throw new ServiceUnavailableException(
        'No se pudo contactar a Google Directions',
      );
    }

    if (!response.ok) {
      throw new ServiceUnavailableException(
        `Google Directions respondió ${response.status}`,
      );
    }

    const data = (await response.json()) as GoogleDirectionsResponse;

    if (data.status !== 'OK' || data.routes.length === 0) {
      throw new ServiceUnavailableException(
        `Google Directions: ${data.error_message ?? data.status}`,
      );
    }

    const route = data.routes[0];
    const leg = route.legs?.[0];

    return {
      polyline_encoded: route.overview_polyline?.points ?? null,
      distance_meters: leg?.distance?.value ?? null,
      duration_seconds: leg?.duration?.value ?? null,
    };
  }
}
