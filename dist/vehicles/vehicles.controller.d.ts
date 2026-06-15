import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { VehicleService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
export declare class VehicleController {
    private readonly service;
    constructor(service: VehicleService);
    create(createDto: CreateVehicleDto): Promise<import("./entities/vehicle.entity").Vehicle>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/vehicle.entity").Vehicle>>;
    findOne(id: string): Promise<import("./entities/vehicle.entity").Vehicle>;
    update(id: string, updateDto: UpdateVehicleDto): Promise<import("./entities/vehicle.entity").Vehicle>;
    remove(id: string): Promise<void>;
}
