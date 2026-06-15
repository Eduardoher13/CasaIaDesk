import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ServiceRequestService } from './service_requests.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
export declare class ServiceRequestController {
    private readonly service;
    constructor(service: ServiceRequestService);
    create(createDto: CreateServiceRequestDto): Promise<import("./entities/service-request.entity").ServiceRequest>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/service-request.entity").ServiceRequest>>;
    findOne(id: string): Promise<import("./entities/service-request.entity").ServiceRequest>;
    update(id: string, updateDto: UpdateServiceRequestDto): Promise<import("./entities/service-request.entity").ServiceRequest>;
    remove(id: string): Promise<void>;
}
