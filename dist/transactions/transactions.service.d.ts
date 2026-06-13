import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionService {
    private readonly repository;
    constructor(repository: Repository<Transaction>);
    create(createDto: CreateTransactionDto): Promise<Transaction>;
    findAll(skip?: number, take?: number): Promise<[Transaction[], number]>;
    findOne(id: string): Promise<Transaction>;
    update(id: string, updateDto: UpdateTransactionDto): Promise<Transaction>;
    remove(id: string): Promise<void>;
}
