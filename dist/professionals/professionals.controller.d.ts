import { ProfessionalService } from './professionals.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
export declare class ProfessionalController {
    private readonly service;
    constructor(service: ProfessionalService);
    create(createDto: CreateProfessionalDto): Promise<import("./entities/professional.entity").Professional>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/professional.entity").Professional[], number]>;
    findOne(id: string): Promise<import("./entities/professional.entity").Professional>;
    update(id: string, updateDto: UpdateProfessionalDto): Promise<import("./entities/professional.entity").Professional>;
    remove(id: string): Promise<void>;
}
