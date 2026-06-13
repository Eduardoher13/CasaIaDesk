import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderService {
    private readonly repository;
    constructor(repository: Repository<Order>);
    create(createDto: CreateOrderDto): Promise<Order>;
    findAll(skip?: number, take?: number): Promise<[Order[], number]>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateDto: UpdateOrderDto): Promise<Order>;
    remove(id: string): Promise<void>;
}
