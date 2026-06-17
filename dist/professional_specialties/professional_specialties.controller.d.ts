import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ProfessionalSpecialtyService } from './professional_specialties.service';
import { CreateProfessionalSpecialtyDto } from './dto/create-professional-specialty.dto';
import { UpdateProfessionalSpecialtyDto } from './dto/update-professional-specialty.dto';
export declare class ProfessionalSpecialtyController {
    private readonly service;
    constructor(service: ProfessionalSpecialtyService);
    create(createDto: CreateProfessionalSpecialtyDto): Promise<import("./entities/professional-specialty.entity").ProfessionalSpecialty>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/professional-specialty.entity").ProfessionalSpecialty>>;
    findByProfessional(professionalId: string): Promise<{
        data: import("./entities/professional-specialty.entity").ProfessionalSpecialty[];
        total: number;
    }>;
    findOne(professional_id: string, specialty_id: number): Promise<import("./entities/professional-specialty.entity").ProfessionalSpecialty>;
    update(professional_id: string, specialty_id: number, updateDto: UpdateProfessionalSpecialtyDto): Promise<import("./entities/professional-specialty.entity").ProfessionalSpecialty>;
    remove(professional_id: string, specialty_id: number): Promise<void>;
}
