import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ServiceRequest } from './entities/service-request.entity';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
export declare class ServiceRequestService {
    private readonly repository;
    constructor(repository: Repository<ServiceRequest>);
    create(createDto: CreateServiceRequestDto): Promise<ServiceRequest>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<ServiceRequest>>;
    findOne(id: string): Promise<ServiceRequest>;
    update(id: string, updateDto: UpdateServiceRequestDto): Promise<ServiceRequest>;
    remove(id: string): Promise<void>;
}
