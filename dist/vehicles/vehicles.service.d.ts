import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
export declare class VehicleService {
    private readonly repository;
    constructor(repository: Repository<Vehicle>);
    create(createDto: CreateVehicleDto): Promise<Vehicle>;
    findAll(skip?: number, take?: number): Promise<[Vehicle[], number]>;
    findOne(id: string): Promise<Vehicle>;
    update(id: string, updateDto: UpdateVehicleDto): Promise<Vehicle>;
    remove(id: string): Promise<void>;
}
