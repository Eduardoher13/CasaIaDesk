import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Specialty } from './entities/specialty.entity';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
export declare class SpecialtyService {
    private readonly repository;
    constructor(repository: Repository<Specialty>);
    create(createDto: CreateSpecialtyDto): Promise<Specialty>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Specialty>>;
    findOne(id: number): Promise<Specialty>;
    findBySlug(slug: string): Promise<Specialty>;
    update(id: number, updateDto: UpdateSpecialtyDto): Promise<Specialty>;
    remove(id: number): Promise<void>;
}
