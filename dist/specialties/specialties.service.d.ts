import { Repository } from 'typeorm';
import { Specialty } from './entities/specialty.entity';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
export declare class SpecialtyService {
    private readonly repository;
    constructor(repository: Repository<Specialty>);
    create(createDto: CreateSpecialtyDto): Promise<Specialty>;
    findAll(skip?: number, take?: number): Promise<[Specialty[], number]>;
    findOne(id: number): Promise<Specialty>;
    update(id: number, updateDto: UpdateSpecialtyDto): Promise<Specialty>;
    remove(id: number): Promise<void>;
}
