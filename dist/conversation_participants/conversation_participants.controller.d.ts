import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ConversationParticipantService } from './conversation_participants.service';
import { CreateConversationParticipantDto } from './dto/create-conversation-participant.dto';
import { UpdateConversationParticipantDto } from './dto/update-conversation-participant.dto';
export declare class ConversationParticipantController {
    private readonly service;
    constructor(service: ConversationParticipantService);
    create(createDto: CreateConversationParticipantDto): Promise<import("./entities/conversation-participant.entity").ConversationParticipant>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/conversation-participant.entity").ConversationParticipant>>;
    findOne(conversation_id: string, user_id: string): Promise<import("./entities/conversation-participant.entity").ConversationParticipant>;
    update(conversation_id: string, user_id: string, updateDto: UpdateConversationParticipantDto): Promise<import("./entities/conversation-participant.entity").ConversationParticipant>;
    remove(conversation_id: string, user_id: string): Promise<void>;
}
