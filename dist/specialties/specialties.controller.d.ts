import { SpecialtyService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
export declare class SpecialtyController {
    private readonly service;
    constructor(service: SpecialtyService);
    create(createDto: CreateSpecialtyDto): Promise<import("./entities/specialty.entity").Specialty>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/specialty.entity").Specialty[], number]>;
    findOne(id: number): Promise<import("./entities/specialty.entity").Specialty>;
    update(id: number, updateDto: UpdateSpecialtyDto): Promise<import("./entities/specialty.entity").Specialty>;
    remove(id: number): Promise<void>;
}
