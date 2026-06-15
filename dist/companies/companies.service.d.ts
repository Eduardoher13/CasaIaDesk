import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Company } from './entities/company.entity';
import { Product } from '../products/entities/product.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompanyService {
    private readonly repository;
    private readonly productRepository;
    constructor(repository: Repository<Company>, productRepository: Repository<Product>);
    create(createDto: CreateCompanyDto): Promise<Company>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Company>>;
    findByUserId(userId: string): Promise<Company>;
    getStorefront(id: string, filters: PaginationQueryDto): Promise<{
        company: Company;
        products: import("../common/pagination/pagination.util").PaginatedResult<Product>;
    }>;
    findOne(id: string): Promise<Company>;
    update(id: string, updateDto: UpdateCompanyDto): Promise<Company>;
    remove(id: string): Promise<void>;
}
