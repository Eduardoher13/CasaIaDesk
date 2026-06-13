import { OrderService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderController {
    private readonly service;
    constructor(service: OrderService);
    create(createDto: CreateOrderDto): Promise<import("./entities/order.entity").Order>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/order.entity").Order[], number]>;
    findOne(id: string): Promise<import("./entities/order.entity").Order>;
    update(id: string, updateDto: UpdateOrderDto): Promise<import("./entities/order.entity").Order>;
    remove(id: string): Promise<void>;
}
