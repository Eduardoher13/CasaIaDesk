import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
export declare class VehicleService {
    private readonly repository;
    constructor(repository: Repository<Vehicle>);
    create(createDto: CreateVehicleDto): Promise<Vehicle>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Vehicle>>;
    findOne(id: string): Promise<Vehicle>;
    update(id: string, updateDto: UpdateVehicleDto): Promise<Vehicle>;
    remove(id: string): Promise<void>;
}
