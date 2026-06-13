import { ProfessionalSpecialtyService } from './professional_specialties.service';
import { CreateProfessionalSpecialtyDto } from './dto/create-professional-specialty.dto';
import { UpdateProfessionalSpecialtyDto } from './dto/update-professional-specialty.dto';
export declare class ProfessionalSpecialtyController {
    private readonly service;
    constructor(service: ProfessionalSpecialtyService);
    create(createDto: CreateProfessionalSpecialtyDto): Promise<import("./entities/professional-specialty.entity").ProfessionalSpecialty>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/professional-specialty.entity").ProfessionalSpecialty[], number]>;
    findOne(professional_id: string, specialty_id: number): Promise<import("./entities/professional-specialty.entity").ProfessionalSpecialty>;
    update(professional_id: string, specialty_id: number, updateDto: UpdateProfessionalSpecialtyDto): Promise<import("./entities/professional-specialty.entity").ProfessionalSpecialty>;
    remove(professional_id: string, specialty_id: number): Promise<void>;
}
