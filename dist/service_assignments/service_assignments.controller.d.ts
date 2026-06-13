import { ServiceAssignmentService } from './service_assignments.service';
import { CreateServiceAssignmentDto } from './dto/create-service-assignment.dto';
import { UpdateServiceAssignmentDto } from './dto/update-service-assignment.dto';
export declare class ServiceAssignmentController {
    private readonly service;
    constructor(service: ServiceAssignmentService);
    create(createDto: CreateServiceAssignmentDto): Promise<import("./entities/service-assignment.entity").ServiceAssignment>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/service-assignment.entity").ServiceAssignment[], number]>;
    findOne(id: string): Promise<import("./entities/service-assignment.entity").ServiceAssignment>;
    update(id: string, updateDto: UpdateServiceAssignmentDto): Promise<import("./entities/service-assignment.entity").ServiceAssignment>;
    remove(id: string): Promise<void>;
}
