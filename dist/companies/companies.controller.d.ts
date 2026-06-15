import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CompanyService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompanyController {
    private readonly service;
    constructor(service: CompanyService);
    create(createDto: CreateCompanyDto): Promise<import("./entities/company.entity").Company>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/company.entity").Company>>;
    findByUserId(userId: string): Promise<import("./entities/company.entity").Company>;
    getStorefront(id: string, filters: PaginationQueryDto): Promise<{
        company: import("./entities/company.entity").Company;
        products: import("../common/pagination/pagination.util").PaginatedResult<import("../products/entities/product.entity").Product>;
    }>;
    findOne(id: string): Promise<import("./entities/company.entity").Company>;
    update(id: string, updateDto: UpdateCompanyDto): Promise<import("./entities/company.entity").Company>;
    remove(id: string): Promise<void>;
}
