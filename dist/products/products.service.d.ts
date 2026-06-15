import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
export declare class ProductService {
    private readonly repository;
    constructor(repository: Repository<Product>);
    create(createDto: CreateProductDto): Promise<Product>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Product>>;
    findByCompany(companyId: string, filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Product>>;
    findActive(filters: FindProductsDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Product>>;
    setImageUrl(id: string, imageUrl: string): Promise<Product>;
    updateStock(id: string, delta: number): Promise<Product>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<void>;
}
