import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { DeliveryTrackingService } from './delivery_tracking.service';
import { CreateDeliveryTrackingDto } from './dto/create-delivery-tracking.dto';
import { UpdateDeliveryTrackingDto } from './dto/update-delivery-tracking.dto';
export declare class DeliveryTrackingController {
    private readonly service;
    constructor(service: DeliveryTrackingService);
    create(createDto: CreateDeliveryTrackingDto): Promise<import("./entities/delivery-tracking.entity").DeliveryTracking>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/delivery-tracking.entity").DeliveryTracking>>;
    findOne(id: string): Promise<import("./entities/delivery-tracking.entity").DeliveryTracking>;
    update(id: string, updateDto: UpdateDeliveryTrackingDto): Promise<import("./entities/delivery-tracking.entity").DeliveryTracking>;
    remove(id: string): Promise<void>;
}
