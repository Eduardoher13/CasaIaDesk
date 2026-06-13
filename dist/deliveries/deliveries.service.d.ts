import { Repository } from 'typeorm';
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
export declare class DeliveryService {
    private readonly repository;
    constructor(repository: Repository<Delivery>);
    create(createDto: CreateDeliveryDto): Promise<Delivery>;
    findAll(skip?: number, take?: number): Promise<[Delivery[], number]>;
    findOne(id: string): Promise<Delivery>;
    update(id: string, updateDto: UpdateDeliveryDto): Promise<Delivery>;
    remove(id: string): Promise<void>;
}
