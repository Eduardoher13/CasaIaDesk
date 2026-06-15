import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { DeliveryService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
export declare class DeliveryController {
    private readonly service;
    constructor(service: DeliveryService);
    create(createDto: CreateDeliveryDto): Promise<import("./entities/delivery.entity").Delivery>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/delivery.entity").Delivery>>;
    findOne(id: string): Promise<import("./entities/delivery.entity").Delivery>;
    update(id: string, updateDto: UpdateDeliveryDto): Promise<import("./entities/delivery.entity").Delivery>;
    remove(id: string): Promise<void>;
}
