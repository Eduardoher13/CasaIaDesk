import { ConversationParticipantService } from './conversation_participants.service';
import { CreateConversationParticipantDto } from './dto/create-conversation-participant.dto';
import { UpdateConversationParticipantDto } from './dto/update-conversation-participant.dto';
export declare class ConversationParticipantController {
    private readonly service;
    constructor(service: ConversationParticipantService);
    create(createDto: CreateConversationParticipantDto): Promise<import("./entities/conversation-participant.entity").ConversationParticipant>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/conversation-participant.entity").ConversationParticipant[], number]>;
    findOne(conversation_id: string, user_id: string): Promise<import("./entities/conversation-participant.entity").ConversationParticipant>;
    update(conversation_id: string, user_id: string, updateDto: UpdateConversationParticipantDto): Promise<import("./entities/conversation-participant.entity").ConversationParticipant>;
    remove(conversation_id: string, user_id: string): Promise<void>;
}
