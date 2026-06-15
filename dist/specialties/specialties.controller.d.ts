import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { SpecialtyService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
export declare class SpecialtyController {
    private readonly service;
    constructor(service: SpecialtyService);
    create(createDto: CreateSpecialtyDto): Promise<import("./entities/specialty.entity").Specialty>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/specialty.entity").Specialty>>;
    findOne(id: number): Promise<import("./entities/specialty.entity").Specialty>;
    update(id: number, updateDto: UpdateSpecialtyDto): Promise<import("./entities/specialty.entity").Specialty>;
    remove(id: number): Promise<void>;
}
