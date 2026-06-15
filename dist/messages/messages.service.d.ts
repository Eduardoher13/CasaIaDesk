import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessageService {
    private readonly repository;
    constructor(repository: Repository<Message>);
    create(createDto: CreateMessageDto): Promise<Message>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Message>>;
    findOne(id: string): Promise<Message>;
    update(id: string, updateDto: UpdateMessageDto): Promise<Message>;
    remove(id: string): Promise<void>;
}
