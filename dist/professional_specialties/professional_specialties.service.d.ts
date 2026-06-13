import { Repository } from 'typeorm';
import { ProfessionalSpecialty } from './entities/professional-specialty.entity';
import { CreateProfessionalSpecialtyDto } from './dto/create-professional-specialty.dto';
import { UpdateProfessionalSpecialtyDto } from './dto/update-professional-specialty.dto';
export declare class ProfessionalSpecialtyService {
    private readonly repository;
    constructor(repository: Repository<ProfessionalSpecialty>);
    create(createDto: CreateProfessionalSpecialtyDto): Promise<ProfessionalSpecialty>;
    findAll(skip?: number, take?: number): Promise<[ProfessionalSpecialty[], number]>;
    findOne(professional_id: string, specialty_id: number): Promise<ProfessionalSpecialty>;
    update(professional_id: string, specialty_id: number, updateDto: UpdateProfessionalSpecialtyDto): Promise<ProfessionalSpecialty>;
    remove(professional_id: string, specialty_id: number): Promise<void>;
}
