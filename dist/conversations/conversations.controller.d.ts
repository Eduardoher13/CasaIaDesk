import { ConversationService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
export declare class ConversationController {
    private readonly service;
    constructor(service: ConversationService);
    create(createDto: CreateConversationDto): Promise<import("./entities/conversation.entity").Conversation>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/conversation.entity").Conversation[], number]>;
    findOne(id: string): Promise<import("./entities/conversation.entity").Conversation>;
    update(id: string, updateDto: UpdateConversationDto): Promise<import("./entities/conversation.entity").Conversation>;
    remove(id: string): Promise<void>;
}
