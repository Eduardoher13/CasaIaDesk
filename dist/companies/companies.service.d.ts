import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { Product } from '../products/entities/product.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompanyService {
    private readonly repository;
    private readonly productRepository;
    constructor(repository: Repository<Company>, productRepository: Repository<Product>);
    create(createDto: CreateCompanyDto): Promise<Company>;
    findAll(skip?: number, take?: number): Promise<[Company[], number]>;
    findByUserId(userId: string): Promise<Company>;
    getStorefront(id: string): Promise<{
        company: Company;
        products: Product[];
    }>;
    findOne(id: string): Promise<Company>;
    update(id: string, updateDto: UpdateCompanyDto): Promise<Company>;
    remove(id: string): Promise<void>;
}
