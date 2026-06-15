import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
export declare class DeliveryService {
    private readonly repository;
    constructor(repository: Repository<Delivery>);
    create(createDto: CreateDeliveryDto): Promise<Delivery>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Delivery>>;
    findOne(id: string): Promise<Delivery>;
    update(id: string, updateDto: UpdateDeliveryDto): Promise<Delivery>;
    remove(id: string): Promise<void>;
}
