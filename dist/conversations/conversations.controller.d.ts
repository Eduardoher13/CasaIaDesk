import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ConversationService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
export declare class ConversationController {
    private readonly service;
    constructor(service: ConversationService);
    create(createDto: CreateConversationDto): Promise<import("./entities/conversation.entity").Conversation>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/conversation.entity").Conversation>>;
    findOne(id: string): Promise<import("./entities/conversation.entity").Conversation>;
    update(id: string, updateDto: UpdateConversationDto): Promise<import("./entities/conversation.entity").Conversation>;
    remove(id: string): Promise<void>;
}
