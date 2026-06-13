import { VehicleService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
export declare class VehicleController {
    private readonly service;
    constructor(service: VehicleService);
    create(createDto: CreateVehicleDto): Promise<import("./entities/vehicle.entity").Vehicle>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/vehicle.entity").Vehicle[], number]>;
    findOne(id: string): Promise<import("./entities/vehicle.entity").Vehicle>;
    update(id: string, updateDto: UpdateVehicleDto): Promise<import("./entities/vehicle.entity").Vehicle>;
    remove(id: string): Promise<void>;
}
