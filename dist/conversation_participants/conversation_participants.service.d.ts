import { Repository } from 'typeorm';
import { ConversationParticipant } from './entities/conversation-participant.entity';
import { CreateConversationParticipantDto } from './dto/create-conversation-participant.dto';
import { UpdateConversationParticipantDto } from './dto/update-conversation-participant.dto';
export declare class ConversationParticipantService {
    private readonly repository;
    constructor(repository: Repository<ConversationParticipant>);
    create(createDto: CreateConversationParticipantDto): Promise<ConversationParticipant>;
    findAll(skip?: number, take?: number): Promise<[ConversationParticipant[], number]>;
    findOne(conversation_id: string, user_id: string): Promise<ConversationParticipant>;
    update(conversation_id: string, user_id: string, updateDto: UpdateConversationParticipantDto): Promise<ConversationParticipant>;
    remove(conversation_id: string, user_id: string): Promise<void>;
}
