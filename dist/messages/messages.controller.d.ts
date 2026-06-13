import { MessageService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessageController {
    private readonly service;
    constructor(service: MessageService);
    create(createDto: CreateMessageDto): Promise<import("./entities/message.entity").Message>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/message.entity").Message[], number]>;
    findOne(id: string): Promise<import("./entities/message.entity").Message>;
    update(id: string, updateDto: UpdateMessageDto): Promise<import("./entities/message.entity").Message>;
    remove(id: string): Promise<void>;
}
