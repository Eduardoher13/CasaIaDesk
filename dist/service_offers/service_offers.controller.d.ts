import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ServiceOfferService } from './service_offers.service';
import { CreateServiceOfferDto } from './dto/create-service-offer.dto';
import { UpdateServiceOfferDto } from './dto/update-service-offer.dto';
export declare class ServiceOfferController {
    private readonly service;
    constructor(service: ServiceOfferService);
    create(createDto: CreateServiceOfferDto): Promise<import("./entities/service-offer.entity").ServiceOffer>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/service-offer.entity").ServiceOffer>>;
    findOne(id: string): Promise<import("./entities/service-offer.entity").ServiceOffer>;
    update(id: string, updateDto: UpdateServiceOfferDto): Promise<import("./entities/service-offer.entity").ServiceOffer>;
    remove(id: string): Promise<void>;
}
