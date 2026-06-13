import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
export declare class OrderItemService {
    private readonly repository;
    constructor(repository: Repository<OrderItem>);
    create(createDto: CreateOrderItemDto): Promise<OrderItem>;
    findAll(skip?: number, take?: number): Promise<[OrderItem[], number]>;
    findOne(id: string): Promise<OrderItem>;
    update(id: string, updateDto: UpdateOrderItemDto): Promise<OrderItem>;
    remove(id: string): Promise<void>;
}
