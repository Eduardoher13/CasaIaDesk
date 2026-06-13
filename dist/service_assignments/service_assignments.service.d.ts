import { Repository } from 'typeorm';
import { ServiceAssignment } from './entities/service-assignment.entity';
import { CreateServiceAssignmentDto } from './dto/create-service-assignment.dto';
import { UpdateServiceAssignmentDto } from './dto/update-service-assignment.dto';
export declare class ServiceAssignmentService {
    private readonly repository;
    constructor(repository: Repository<ServiceAssignment>);
    create(createDto: CreateServiceAssignmentDto): Promise<ServiceAssignment>;
    findAll(skip?: number, take?: number): Promise<[ServiceAssignment[], number]>;
    findOne(id: string): Promise<ServiceAssignment>;
    update(id: string, updateDto: UpdateServiceAssignmentDto): Promise<ServiceAssignment>;
    remove(id: string): Promise<void>;
}
