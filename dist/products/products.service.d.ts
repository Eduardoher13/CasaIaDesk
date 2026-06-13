import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductService {
    private readonly repository;
    constructor(repository: Repository<Product>);
    create(createDto: CreateProductDto): Promise<Product>;
    findAll(skip?: number, take?: number): Promise<[Product[], number]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<void>;
}
