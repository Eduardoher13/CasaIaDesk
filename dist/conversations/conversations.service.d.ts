import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
export declare class ConversationService {
    private readonly repository;
    constructor(repository: Repository<Conversation>);
    create(createDto: CreateConversationDto): Promise<Conversation>;
    findAll(skip?: number, take?: number): Promise<[Conversation[], number]>;
    findOne(id: string): Promise<Conversation>;
    update(id: string, updateDto: UpdateConversationDto): Promise<Conversation>;
    remove(id: string): Promise<void>;
}
