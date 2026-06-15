import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ConversationParticipant } from './entities/conversation-participant.entity';
import { CreateConversationParticipantDto } from './dto/create-conversation-participant.dto';
import { UpdateConversationParticipantDto } from './dto/update-conversation-participant.dto';
export declare class ConversationParticipantService {
    private readonly repository;
    constructor(repository: Repository<ConversationParticipant>);
    create(createDto: CreateConversationParticipantDto): Promise<ConversationParticipant>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<ConversationParticipant>>;
    findOne(conversation_id: string, user_id: string): Promise<ConversationParticipant>;
    update(conversation_id: string, user_id: string, updateDto: UpdateConversationParticipantDto): Promise<ConversationParticipant>;
    remove(conversation_id: string, user_id: string): Promise<void>;
}
