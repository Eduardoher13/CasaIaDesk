import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { TransactionService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionController {
    private readonly service;
    constructor(service: TransactionService);
    create(createDto: CreateTransactionDto): Promise<import("./entities/transaction.entity").Transaction>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/transaction.entity").Transaction>>;
    findOne(id: string): Promise<import("./entities/transaction.entity").Transaction>;
    update(id: string, updateDto: UpdateTransactionDto): Promise<import("./entities/transaction.entity").Transaction>;
    remove(id: string): Promise<void>;
}
