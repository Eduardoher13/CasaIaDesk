import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { DeliveryTracking } from './entities/delivery-tracking.entity';
import { CreateDeliveryTrackingDto } from './dto/create-delivery-tracking.dto';
import { UpdateDeliveryTrackingDto } from './dto/update-delivery-tracking.dto';
export declare class DeliveryTrackingService {
    private readonly repository;
    constructor(repository: Repository<DeliveryTracking>);
    create(createDto: CreateDeliveryTrackingDto): Promise<DeliveryTracking>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<DeliveryTracking>>;
    findOne(id: string): Promise<DeliveryTracking>;
    update(id: string, updateDto: UpdateDeliveryTrackingDto): Promise<DeliveryTracking>;
    remove(id: string): Promise<void>;
}
