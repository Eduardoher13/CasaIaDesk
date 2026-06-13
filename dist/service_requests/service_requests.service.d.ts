import { Repository } from 'typeorm';
import { ServiceRequest } from './entities/service-request.entity';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
export declare class ServiceRequestService {
    private readonly repository;
    constructor(repository: Repository<ServiceRequest>);
    create(createDto: CreateServiceRequestDto): Promise<ServiceRequest>;
    findAll(skip?: number, take?: number): Promise<[ServiceRequest[], number]>;
    findOne(id: string): Promise<ServiceRequest>;
    update(id: string, updateDto: UpdateServiceRequestDto): Promise<ServiceRequest>;
    remove(id: string): Promise<void>;
}
