import { FindProductsDto } from './dto/find-products.dto';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SetProductImageDto } from './dto/set-product-image.dto';
export declare class ProductController {
    private readonly service;
    constructor(service: ProductService);
    create(createDto: CreateProductDto): Promise<import("./entities/product.entity").Product>;
    findAll(filters: FindProductsDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/product.entity").Product>>;
    findActive(filters: FindProductsDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/product.entity").Product>>;
    findByCompany(companyId: string, filters: FindProductsDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/product.entity").Product>>;
    findOne(id: string): Promise<import("./entities/product.entity").Product>;
    setImageUrl(id: string, dto: SetProductImageDto): Promise<import("./entities/product.entity").Product>;
    update(id: string, updateDto: UpdateProductDto): Promise<import("./entities/product.entity").Product>;
    remove(id: string): Promise<void>;
}
