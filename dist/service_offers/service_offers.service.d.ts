import { Repository } from 'typeorm';
import { ServiceOffer } from './entities/service-offer.entity';
import { CreateServiceOfferDto } from './dto/create-service-offer.dto';
import { UpdateServiceOfferDto } from './dto/update-service-offer.dto';
export declare class ServiceOfferService {
    private readonly repository;
    constructor(repository: Repository<ServiceOffer>);
    create(createDto: CreateServiceOfferDto): Promise<ServiceOffer>;
    findAll(skip?: number, take?: number): Promise<[ServiceOffer[], number]>;
    findOne(id: string): Promise<ServiceOffer>;
    update(id: string, updateDto: UpdateServiceOfferDto): Promise<ServiceOffer>;
    remove(id: string): Promise<void>;
}
