import { Repository } from 'typeorm';
import { Professional } from './entities/professional.entity';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
export declare class ProfessionalService {
    private readonly repository;
    constructor(repository: Repository<Professional>);
    create(createDto: CreateProfessionalDto): Promise<Professional>;
    findAll(skip?: number, take?: number): Promise<[Professional[], number]>;
    findOne(id: string): Promise<Professional>;
    update(id: string, updateDto: UpdateProfessionalDto): Promise<Professional>;
    remove(id: string): Promise<void>;
}
