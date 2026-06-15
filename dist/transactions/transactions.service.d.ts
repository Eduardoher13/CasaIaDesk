import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionService {
    private readonly repository;
    constructor(repository: Repository<Transaction>);
    create(createDto: CreateTransactionDto): Promise<Transaction>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Transaction>>;
    findOne(id: string): Promise<Transaction>;
    update(id: string, updateDto: UpdateTransactionDto): Promise<Transaction>;
    remove(id: string): Promise<void>;
}
