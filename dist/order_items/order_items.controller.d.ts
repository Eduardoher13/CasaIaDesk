import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { OrderItemService } from './order_items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
export declare class OrderItemController {
    private readonly service;
    constructor(service: OrderItemService);
    create(createDto: CreateOrderItemDto): Promise<import("./entities/order-item.entity").OrderItem>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/order-item.entity").OrderItem>>;
    findOne(id: string): Promise<import("./entities/order-item.entity").OrderItem>;
    update(id: string, updateDto: UpdateOrderItemDto): Promise<import("./entities/order-item.entity").OrderItem>;
    remove(id: string): Promise<void>;
}
