import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductService {
    private readonly repository;
    constructor(repository: Repository<Product>);
    create(createDto: CreateProductDto): Promise<Product>;
    findAll(skip?: number, take?: number): Promise<[Product[], number]>;
    findByCompany(companyId: string, skip?: number, take?: number): Promise<[Product[], number]>;
    findActive(skip?: number, take?: number, search?: string): Promise<[Product[], number]>;
    setImageUrl(id: string, imageUrl: string): Promise<Product>;
    updateStock(id: string, delta: number): Promise<Product>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<void>;
}
