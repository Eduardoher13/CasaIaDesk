import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ServiceAssignment } from './entities/service-assignment.entity';
import { CreateServiceAssignmentDto } from './dto/create-service-assignment.dto';
import { UpdateServiceAssignmentDto } from './dto/update-service-assignment.dto';
export declare class ServiceAssignmentService {
    private readonly repository;
    constructor(repository: Repository<ServiceAssignment>);
    create(createDto: CreateServiceAssignmentDto): Promise<ServiceAssignment>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<ServiceAssignment>>;
    findOne(id: string): Promise<ServiceAssignment>;
    update(id: string, updateDto: UpdateServiceAssignmentDto): Promise<ServiceAssignment>;
    remove(id: string): Promise<void>;
}
