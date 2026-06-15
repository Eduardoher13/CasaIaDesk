import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ServiceAssignmentService } from './service_assignments.service';
import { CreateServiceAssignmentDto } from './dto/create-service-assignment.dto';
import { UpdateServiceAssignmentDto } from './dto/update-service-assignment.dto';
export declare class ServiceAssignmentController {
    private readonly service;
    constructor(service: ServiceAssignmentService);
    create(createDto: CreateServiceAssignmentDto): Promise<import("./entities/service-assignment.entity").ServiceAssignment>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/service-assignment.entity").ServiceAssignment>>;
    findOne(id: string): Promise<import("./entities/service-assignment.entity").ServiceAssignment>;
    update(id: string, updateDto: UpdateServiceAssignmentDto): Promise<import("./entities/service-assignment.entity").ServiceAssignment>;
    remove(id: string): Promise<void>;
}
