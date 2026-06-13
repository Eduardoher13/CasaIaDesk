import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly service;
    constructor(service: ProductService);
    create(createDto: CreateProductDto): Promise<import("./entities/product.entity").Product>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/product.entity").Product[], number]>;
    findOne(id: string): Promise<import("./entities/product.entity").Product>;
    update(id: string, updateDto: UpdateProductDto): Promise<import("./entities/product.entity").Product>;
    remove(id: string): Promise<void>;
}
