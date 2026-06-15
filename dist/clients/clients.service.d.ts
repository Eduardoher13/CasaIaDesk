import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientService {
    private readonly repository;
    constructor(repository: Repository<Client>);
    create(createDto: CreateClientDto): Promise<Client>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Client>>;
    findByUserId(userId: string): Promise<Client>;
    findOne(id: string): Promise<Client>;
    update(id: string, updateDto: UpdateClientDto): Promise<Client>;
    remove(id: string): Promise<void>;
}
