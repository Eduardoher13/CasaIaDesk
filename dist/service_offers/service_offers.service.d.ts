import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ServiceOffer } from './entities/service-offer.entity';
import { CreateServiceOfferDto } from './dto/create-service-offer.dto';
import { UpdateServiceOfferDto } from './dto/update-service-offer.dto';
export declare class ServiceOfferService {
    private readonly repository;
    constructor(repository: Repository<ServiceOffer>);
    create(createDto: CreateServiceOfferDto): Promise<ServiceOffer>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<ServiceOffer>>;
    findOne(id: string): Promise<ServiceOffer>;
    update(id: string, updateDto: UpdateServiceOfferDto): Promise<ServiceOffer>;
    remove(id: string): Promise<void>;
}
