import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { DirectionsQueryDto } from './dto/directions-query.dto';
export declare class DeliveryService {
    private readonly repository;
    private readonly configService;
    constructor(repository: Repository<Delivery>, configService: ConfigService);
    create(createDto: CreateDeliveryDto): Promise<Delivery>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Delivery>>;
    findOne(id: string): Promise<Delivery>;
    update(id: string, updateDto: UpdateDeliveryDto): Promise<Delivery>;
    remove(id: string): Promise<void>;
    getDirections(query: DirectionsQueryDto): Promise<{
        polyline_encoded: string | null;
        distance_meters: number | null;
        duration_seconds: number | null;
    }>;
}
