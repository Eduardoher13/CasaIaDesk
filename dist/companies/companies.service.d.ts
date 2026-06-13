import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompanyService {
    private readonly repository;
    constructor(repository: Repository<Company>);
    create(createDto: CreateCompanyDto): Promise<Company>;
    findAll(skip?: number, take?: number): Promise<[Company[], number]>;
    findOne(id: string): Promise<Company>;
    update(id: string, updateDto: UpdateCompanyDto): Promise<Company>;
    remove(id: string): Promise<void>;
}
