import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
export declare class ConversationService {
    private readonly repository;
    constructor(repository: Repository<Conversation>);
    create(createDto: CreateConversationDto): Promise<Conversation>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Conversation>>;
    findOne(id: string): Promise<Conversation>;
    update(id: string, updateDto: UpdateConversationDto): Promise<Conversation>;
    remove(id: string): Promise<void>;
}
